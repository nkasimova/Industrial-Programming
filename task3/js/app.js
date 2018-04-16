    var placeholder = document.createElement("li");
		placeholder.className = "placeholder";
	var ToDoBanner = React.createClass({
		render: function(){
			return (
			 <h3></h3>
			);
		}
	});
	
	var ToDoList = React.createClass({
		Remove: function(e){
		   this.props.onDelete(e);
		},
		DragStart: function(e){
			this.dragged = e.currentTarget;
			e.dataTransfer.effectAllowed = 'move';
		},
		DragEnd: function(e){
			this.dragged.style.display="";
			var IshasNode = false
			
			Array.prototype.forEach.call (this.dragged.parentNode.childNodes, function (node) {
				if(node.className=="placeholder")
								IshasNode = true;

			} );
			if(!IshasNode)
			return;
			this.dragged.parentNode.removeChild(placeholder);
			var data = this.props.items;
			var from = Number(this.dragged.dataset.id);
			var to = Number(this.over.dataset.id);
			if(from < to) to--;
			if(this.nodePlacement == "after") to++;
			data.splice(to, 0, data.splice(from, 1)[0]);
			this.setState({data: data});	
		},
		DragOver: function(e) {
	
			e.preventDefault();
			this.dragged.style.display = "none";
			
			if(e.target.className == "placeholder") return;
			this.over = e.target;
			// Inside the dragOver method
			var relY = e.clientY - this.over.offsetTop;
			var height = this.over.offsetHeight / 2;
			var parent = e.target.parentNode;
			
			if(relY > height) {
			  this.nodePlacement = "after";
			  parent.insertBefore(placeholder, e.target.nextElementSibling);
			}
			else if(relY < height) {
			  this.nodePlacement = "before";
			  parent.insertBefore(placeholder, e.target);
			}
		},
		render: function() {
			
			var createItem = function(itemText,i) {
			
				return (
					<ToDoListItem key={i} value={i} onDragEnd={this.DragEnd}
            onDragStart={this.DragStart} onRemove = {this.Remove}>{itemText}</ToDoListItem>
				);
			};
			var allitems = this.props.items;
            // Here is the filter function 
			var status = this.props.filter[0].Status;
			switch (status){
				case 'false':
				 allitems = allitems.filter(t => !t.isDone)
				 break;
				 case 'true':
				 allitems = allitems.filter(t => t.isDone)
			};
			// Here is the search function 
			var queryText = this.props.filter[0].keyword;
		 
			if(queryText){
				var queryResult=[];
				allitems.forEach(function(item){
					if(item.item.toLowerCase().indexOf(queryText)!=-1)
					queryResult.push(item);
				});
				return <ul onDragOver={this.DragOver}>{queryResult.map(createItem,this)}</ul>;
			}
	
			return <ul onDragOver={this.DragOver}>{allitems.map(createItem,this)}</ul>;
		}
    });
	
	var ToDoListItem = React.createClass({
		ChangeHandler: function(e){
			this.setState({
			  value: e.target.checked
			});
			this.props.children.isDone = e.target.checked;
		},
		RemoveHandler: function(){
		   this.props.onRemove(this.props.value);
		},
		DragEndHandler : function(e){
				this.props.onDragEnd(e);
			},
		DragStartHandler : function(e){
				this.props.onDragStart(e);
		},
		render: function(){
		
			var _style = "line-through";
			if(!this.props.children.isDone)
			_style ="none";
			return (
			  <li data-id={this.props.value} 
						key={this.props.value} draggable="true" onDragEnd={this.DragEndHandler}
					onDragStart={this.DragStartHandler}><button type="button" className="close pull-right" aria-hidden="true" onClick={this.RemoveHandler}>&times;</button><input type="checkbox" onChange={this.ChangeHandler} defaultChecked={this.props.children.isDone} /><span style={{"textDecoration": _style}}>{this.props.children.item}</span></li>
			);
		}
    });
	
	var ToDoForm = React.createClass({
		getInitialState: function() {
			return {item: ''};
        },
		handleSubmit: function(e){
			e.preventDefault();
			this.props.onFormSubmit(this.state.item);
			this.setState({item: ''});
			ReactDOM.findDOMNode(this.refs.item).focus();
			return;
		},
		onChange: function(e){
			this.setState({
			  item: e.target.value
			});
		},
		render: function(){
			return (
				<div className="row">
				  <form  onSubmit={this.handleSubmit}>
					<div className="form-group col-sm-10">
						<input type='text' className="todoField form-control"  ref='item' onChange={this.onChange} value={this.state.item}/>
						<input type='submit' className="btn btn-default" style={{"float":"left","marginLeft":"5px"}} value='Add'/>
					</div>
				  </form>
				</div>
			);
		}
    });


	var ToDoFilter = React.createClass({
		isActive:function(value){
			return 'btn '+((value===this.props.filter[0].Status) ?'btn-primary':'default');
		},
		render: function(){
		 var onFilter1 = this.props.onFilter;

		          return(
				  <div className="row"></div>
				  );
		}
	});

	var ToDoCatalogForm = React.createClass({
		getInitialState: function() {
			return {item: ''};
        },
		handleSubmit: function(e){
			e.preventDefault();
			this.props.onFormSubmit(this.state.item);
			this.setState({item: ''});
			ReactDOM.findDOMNode(this.refs.item).focus();
			return;
		},
		onChange: function(e){
			this.setState({
			  item: e.target.value
			});
		},
		render: function(){
			return (
				<div className="row">
				  <form  onSubmit={this.handleSubmit}>
					<div className="form-group ">
						<input type='text' className="newTodoCatalogField form-control"  ref='item' onChange={this.onChange} value={this.state.item}/>
						<input type='submit' className="btn btn-default" style={{"float":"left","marginLeft":"5px"}} value='Add'/>
					</div>
				  </form>
				  </div>
				
			);
		}
    });

	var ToDoCatelog  = React.createClass({
		
		changeTodo : function(e){
			this.props.onSelected( e.currentTarget.dataset.id);
		},
		checkActive:function(i){
	
			if (i == this.props.selectedID)
			{
				return "list-group-item active";
			}
			else
			{
				return "list-group-item ";
			}
		},
		render: function(){	
		
		    var selectedID = this .props.selectedID;
			var allitems =this.props.Todos;
			
			return <div className="list-group">
			{
				allitems.map(function(item,i){ 
				var _class = "";
				if (i == this.props.selectedID)
			{
				_class =  "list-group-item active";
			}
			else
			{
				_class =  "list-group-item ";
			}
				return(
			
					 <a href="#" key={i} data-id={i} className={_class} onClick={this.changeTodo} ><span className="badge" >{item.items.length}</span>{item.name}</a>
				)
			},this)}</div>;
		}
	});

	var TodoApp = React.createClass({
		getInitialState : function(){
			return {Todo:[{name:"parimary",items:[{item:'Todo itme #1',isDone:false},{item:'Todo itme #2',isDone:true},{item:'aaaa',isDone:true},{item:'dddd',isDone:true}
			]}],filter:[{keyword:'',Status:"SHOW_ALL"}],selectedCatelog:"0"};
            fetch('http://localhost:8000/tasks/',
                    {
                        method:"GET",
                        content:'application/json',
                    })
                    .then(response => {
                    return response.json();
            })
            .then(json => {
                console.log(json);
                this.setState({
            		Todo:[{name:"parimary",items:[{item:'Todo itme #1',isDone:false},{item:'Todo itme #2',isDone:true},{item:'aaaa',isDone:true},{item:'dddd',isDone:true}
                	]}],filter:[{keyword:'',Status:"SHOW_ALL"}]
                });
            })
            .catch(error => {
                return console.log(error);
            })
        },
		updateItems: function(newItem){
		
			var item = {item:newItem,isDone:false};
		
			var newtodo = this.state.Todo;
			var allItems = this.state.Todo[this.state.selectedCatelog].items.concat([item]);
			newtodo[this.state.selectedCatelog].items = allItems;
			this.setState({
				Todo: newtodo
			});
            fetch('http://localhost:8000/tasks/',
                {
                    method:"POST",
                    content:'application/json',
                    body: newtodo
                }).catch(error => console.log(error))

        },
		deleteItem : function(index){
			var newtodo = this.state.Todo;
			var allItems = this.state.Todo[this.state.selectedCatelog].items.slice(); //copy array
			allItems.splice(index, 1); //remove element
			newtodo[this.state.selectedCatelog].items = allItems;
			this.setState({
				Todo: newtodo
			});
            fetch("http://localhost:8000/tasks/" , {
                method: "DELETE",
                body: newtodo
            }).catch(error => console.log(error));
		},
		render: function(){
			return (
				<div className="row">
					<div className="col-xs-6">
						<ToDoBanner/>
						<ToDoFilter onFilter = {this.filterItem}filter={this.state.filter}/>
						<ToDoForm onFormSubmit = {this.updateItems} />
						<ToDoList  items = {this.state.Todo[this.state.selectedCatelog].items} filter = {this.state.filter} onDelete={this.deleteItem}/>
					</div>
				</div>
			);
		}
	});
	 
	ReactDOM.render(
        <TodoApp/>,
        document.getElementById('todo')
    );
