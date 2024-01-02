import React, {useState, KeyboardEvent} from 'react';
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
    addTask: (title: string) => void
    removeTask: (taskid: string) => void
    changeTodoListFilter: (filterValues: FilterValuesType) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    filterValues: FilterValuesType
}

export function Todolist({
                             changeTodoListFilter,
                             title,
                             tasks,
                             addTask,
                             removeTask,
                             changeTaskStatus,
                             filterValues,
                         }: TodoListPropsType) {

    const [taskTitle, setTaskTitle] = useState("")
    const [inputError, setInputError] = useState(false)

    const listItems: Array<JSX.Element> = tasks.map((task: TaskType) => {

        return (
            <li key={task.id} className={task.isDone ? "task-done" : "task"}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button title={"x"} onClickHandler={() => removeTask(task.id)}/>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length !== 0
        ? <ul>{listItems}</ul>
        : <span>Tasks list is emtry</span>

    //const onChangeSetTaskTitle

    const addTaskOnClickHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(taskTitle)
        } else {
            setInputError(true)
        }
        setTaskTitle("")
    }

    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskOnClickHandler()
        }
    }

    return (
        <div>
            <div className={"todolist"}>
                <h3>{title}</h3>
                <div>
                    <input
                        value={taskTitle}
                        onChange={(e) => {
                            setTaskTitle(e.currentTarget.value)
                            inputError && setInputError(false)
                        }}
                        onKeyDown={addTaskKeyDownHandler}
                        className={inputError ? "input-error" : ""}
                    />

                    <Button
                        onClickHandler={addTaskOnClickHandler}
                        isDisabled={!taskTitle.trim()}
                        title={"+"}
                    />
                    {inputError && <div style={{color: 'red'}}>Title is requared!</div>}
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button classes={filterValues === 'all' ? "btn-active" : ""}
                            onClickHandler={() => changeTodoListFilter('all')}
                            title={"All"}/>
                    <Button classes={filterValues === 'active' ? "btn-active" : ""}
                            onClickHandler={() => changeTodoListFilter('active')}
                            title={"Active"}/>
                    <Button classes={filterValues === 'completed' ? "btn-active" : ""}
                            onClickHandler={() => changeTodoListFilter('completed')}
                            title={"Completed"}/>
                </div>
            </div>
        </div>
    )
}


