#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];
let conditions = true;

console.log(chalk.yellow.bold("\n \t Welcome To Todo-List Application\n"));

let main = async () => {
    while(conditions){
let option = await inquirer.prompt(
    [
        {
            name: "choices",
            type: "list",
            message: "Select on option you want to do: ",
            choices: ["Add Task", "Delete Task", "Update Task", "View todo-List", "Exit"]
        } 
    ]
); 
if(option.choices === "Add Task"){
    await addTask();
}
else if(option.choices === "Delete Task"){
    await deleteTask();
}
else if(option.choices === "Update Task"){
    await updateTask();
}
else if(option.choices === "View todo-List"){
    await viewTodoList();
}
else if(option.choices === "Exit"){
    conditions = false;
}
    }
}

let addTask = async () => {
    let newTask = await inquirer.prompt(
        [
            {
                name: "task",
                type: "input",
                message: "Enter your new task: "
            }
        ]
    );
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} added successfully in Todo-List`);  
}

let viewTodoList  = async () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);    
    });
    console.log("\n");   
}

let deleteTask = async () => {
    await viewTodoList();
    let taskIndex = await inquirer.prompt(
        [
            {
                name: "index",
                type: "number",
                message: "Enter the 'index.no' of the task you want to delete :"
            }
        ]
    );
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask} task deleted successfully from Todo-List`);      
}

let updateTask = async () => {
    await viewTodoList();
    let updateTaskIndex = await inquirer.prompt(
        [
            {
                name: "index",
                type: "number",
                message: "Enter the 'index.no' of the task you want to update : "
            },
            {
                name: "new_task",
                type: "input",
                message: "Enter new task name :",
            }
        ]
    );
    todoList[updateTaskIndex.index - 1] = updateTaskIndex.new_task;
    console.log(`\n Task at index no ${updateTaskIndex.index - 1} updated successfully [For updated list check option: "View todo-List"]`);   
}

main();
