import React, {ChangeEvent, useRef, useState} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskid: string) => void
    changeTodoListFilter: (filterValues: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist({
                             changeTodoListFilter,
                             title,
                             tasks,
                             removeTask,
                             addTask
                         }: TodoListPropsType) {

    const taskTitleInput = useRef<HTMLInputElement>(null)

    const listItems: Array<JSX.Element> = tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length !== 0
        ? <ul>{listItems}</ul>
        : <span>Tasks list is emtry</span>

    const addTaskHandler = () => {
        if (taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value
            addTask(newTaskTitle)
            taskTitleInput.current.value = ""
        }
    }

    /*const [newTaskTitle, setNewTaskTitle] = useState("");*/

    /*const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }*/

    return (
        <div>
            <div className={"todolist"}>
                <h3>{title}</h3>
                <div>
                    <input ref={taskTitleInput}/>
                    {/*<input value={newTaskTitle}
                           onChange={onChangeHandler}
                        onKeyPress={(e)=>{
                            if (e.charCode === 13){
                                addTask(newTaskTitle); setNewTaskTitle("")
                        }}
                        />*/}
                    <Button onClickHandler={addTaskHandler} title={"+"}/>
                    {/*<Button onClickHandler={() => {
                        addTask(newTaskTitle);
                        setNewTaskTitle("")
                    }} title={"+"}/>*/}
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button onClickHandler={() => changeTodoListFilter('all')} title={"All"}/>
                    <Button onClickHandler={() => changeTodoListFilter('active')} title={"Active"}/>
                    <Button onClickHandler={() => changeTodoListFilter('completed')} title={"Completed"}/>
                </div>
            </div>
        </div>
    )
}


