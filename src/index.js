import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import css from './app.css';
import registerServiceWorker from './registerServiceWorker';

export default class App extends Component{

	constructor(props){
		super(props);
		this.state ={
			editMode:-1,
			error:false,
			addTaskView:false,
			addNewTask: '',
			task : []
		}
	}


	toggleAddTaskView = (e) =>{
		e.preventDefault();
		this.setState({addTaskView:!this.state.addTaskView,addNewTask:''})
	};

	addTask = (e)=>{
		let addNewTask = this.state.addNewTask;
		if(addNewTask!== ''){
			let addToTask = this.state.task;
			addToTask.push({note:this.state.addNewTask,status:true}); 
			this.setState({
				task:addToTask,
				addTaskView: false,
				addNewTask:'',
				error:false
			})
		} else {
			this.setState({
				error:true
			})
		}
		
	};

	changeText =(e)=>{
		this.setState({
			addNewTask : e.target.value,

		})
	};

	deleteTask = (index)=>{
		let task = this.state.task;
		task.splice(task.length-(index+1),1);
		this.setState({
			task:task
		})
	};
	taskDone = (index)=>{
		let task = this.state.task;
		task[task.length-(index+1)].status = !task[task.length-(index+1)].status;
		this.setState({task:task});
	};
	editTaskMode =(index)=>{
		let task = this.state.task;
		let value = task[task.length-(index+1)].note;
		this.setState({addTaskView:!this.state.addTaskView,addNewTask:value,editMode:task.length-(index+1)});
		
	};

	editTask = (e) =>{
		let task = this.state.task;
		task[this.state.editMode].note = this.state.addNewTask;
		this.setState({task:task,addTaskView: false,addNewTask:'',editMode:-1});
	}

	render(){
		
		const dataList =  this.state.task.slice(0).reverse().map((data,index)=>{
							return(
							<li key={index} className={!data.status && 'done'} className={(!data.status)?"done" :"not-done"}>
								<span onClick={()=>{this.taskDone(index)}}>
									<i className={(!data.status)?"fa fa-check" :"fa fa-square-o"} aria-hidden="true"></i>
								</span>
								<p className='test'>{data.note}</p>
								<span onClick={()=>{this.deleteTask(index)}}><i className="fa fa-trash-o" aria-hidden="true"></i></span>
								{(data.status) && <span onClick={()=>this.editTaskMode(index)}><i className="fa fa-pencil" aria-hidden="true"></i></span>}
							</li>

						)});

		return (
			<div className="myApp">
				<div className="app-mainScreen">
					<div className="app-title">
						<h1>To Do List</h1>
					</div>
					<div className="app-addTask">
						<button onClick={this.toggleAddTaskView}>Add a task <span><i className="fa fa-plus" aria-hidden="true"></i></span> </button>
					</div>					
					<div className="app-tasks">
						<ul>
							{dataList}				
						</ul>
					</div>			
				</div>	
				{ this.state.addTaskView &&				
				<div className="app-addTask-screen">
					<div className="app-addTask-screen-wrapper"> 
						<div className="app-addTask-header">
							<h2><span onClick={this.toggleAddTaskView}><i className="fa fa-arrow-left" aria-hidden="true"></i></span> Add Task</h2>
						</div>					
						<div className="app-addTask-content">
							<label>Add Note</label>
							<input type="text" name="task" value={this.state.addNewTask} onChange={this.changeText}/>
							{this.state.error && <span className="app-errorMsg">Cannot be empty</span>}
						</div>
						<div className="app-addTask-footer">
							<button onClick={(this.state.editMode > -1)?this.editTask:this.addTask}> Add Task </button>
						</div>		
					</div>								
				</div>
				}
				<p className="app-taskPending">{this.state.task.filter(task=>task.status === true).length} task pending</p>
			</div>


	)}
} 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
