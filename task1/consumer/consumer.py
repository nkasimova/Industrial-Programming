#!/usr/bin/env python
import pika
import time
import postgresql

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

mdatabase = postgresql.open('pq://docker:docker@database:5432/docker')
mdatabase.execute("DROP TABLE IF EXISTS messages;")
mdatabase.execute("CREATE TABLE messages (id SERIAL PRIMARY KEY, msg CHAR(256));")
insert_to_db = mdatabase.prepare("INSERT INTO messages (msg) VALUES ($1)")

print("Insert was successful.")

channel.queue_declare(queue='task_queue', durable=True)

def callback(ch, method, properties, body):
    time.sleep(10)
    insert_to_db(str(body))
    ch.basic_ack(delivery_tag = method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(callback,
                      queue='task_queue')

channel.start_consuming()