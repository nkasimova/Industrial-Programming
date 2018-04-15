function update_task(task_id){
    var task = document.getElementById("task_check"+task_id);
    console.log(task.checked);
    if (task.checked === true)
        flag = 'True';
    else
        flag = 'False';
    $.ajax({
        type: 'POST',
        url: "/check/",
        data: {'task_id': task_id, 'completed': flag, csrfmiddlewaretoken: window.CSRF_TOKEN},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        processData: true,
        failure: function() {
            alert("checked error")
        }
      });
}