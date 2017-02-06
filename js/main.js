"use strict";
var taskBoard = {
    taskList: ['OPEN', 'IN PROGRESS'],
    assignRandomIds: function() {
        var taskItems = document.querySelectorAll('div.task-item'),
            self = this;
        taskItems.forEach(function(taskItem) {
            taskItem.setAttribute('id', self.getTaskItemId());
        })
    },
    
    createNewTaskList: function(event) {
        var newTaskListName = document.getElementById('task-list-name').value;
        if(!this.taskListExists(newTaskListName)) {
            this.taskList.push(newTaskListName);
            var taskListTemp = '<div class="task-list"><div class="task-title">' + newTaskListName + '<i class="delete-icon pull-right" onclick="taskBoard.deleteTaskList(event)" title="Delete">X</i></div><div class="task-list-items" ondrop="taskBoard.drop(event)" ondragover="taskBoard.allowDrop(event)"></div><div class="add-task-item-container"><form onsubmit="taskBoard.createTaskItem(event)"><input type="text" placeholder="Add a task..." class="add-task-input" required></form></div></div>';
            
            document.getElementById('task-lists-container').insertAdjacentHTML('beforeend', taskListTemp);
        } else {
            alert("Task list with name " + newTaskListName + " already exists.");
        }
        document.getElementById('task-list-name').value = "";
        event.preventDefault();
        return false;  
    },
    
    taskListExists: function(taskListName) {
        if(this.taskList.indexOf(taskListName) === -1) {
            return false;
        }
        return true;
    },
    
    deleteTaskList: function(event) {
        var retVal = confirm("Do you want to delete the tasklist ?");
        if( retVal === true ){
            var taskTitle = event.target.parentElement;
            var taskListName = taskTitle.innerText;
            this.taskList.splice(this.taskList.indexOf(taskListName), 1);
            taskTitle.parentElement.remove();
            return true;
       }
    },
    
    drag: function(event) {
        event.dataTransfer.setData("text", event.target.id);
    },
    
    allowDrop: function(event) {
        event.preventDefault();
    },
    
    drop: function(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    },
    
    getTaskItemId: function() {
        return "task-item-" + Math.random().toString(); 
    },
    
    createTaskItem: function(event) {
        var targetEl = event.target;
        var taskItem = targetEl.getElementsByClassName('add-task-input')[0];
        var taskListItems = targetEl.parentElement.parentElement.getElementsByClassName('task-list-items')[0];
        var taskItemTemp = '<div class="task-item" draggable="true" ondragstart="taskBoard.drag(event)" id="' + this.getTaskItemId() + '">' + taskItem.value + '<i class="delete-icon pull-right" onclick="taskBoard.deleteTaskItem(event)" title="Delete">x</i></div>';
        
        taskListItems.insertAdjacentHTML("beforeend", taskItemTemp);
        taskItem.value = "";
        event.preventDefault();
        return false;
    },
    
    deleteTaskItem: function(event) {
        var retVal = confirm("Do you want to delete the task item ?");
        if( retVal === true ){
            event.target.parentElement.remove()
            return true;
       }
    }
};

window.onload = function() {
    taskBoard.assignRandomIds();   
};

