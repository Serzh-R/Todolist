import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

// C-(R)-U-(D)

function App() {

    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "REACT", isDone: false}
    ])

    const [filterValues, setFilterValues] = useState<FilterValuesType>('all')

    const removeTasks = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            // title (можем написать так если имя св-ва совпадает с именем переменной)
            isDone: false
        };
        const nextState: Array<TaskType> = [newTask, ...tasks];
        setTasks(nextState);

        //setTasks([{id: v1(), title, isDone: false},...tasks])  // более короткий код того же самого
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks(nextState)
    }

    const changeTodoListFilter = (filterValues: FilterValuesType) => {
        setFilterValues(filterValues)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValues: FilterValuesType): Array<TaskType> => {

        /*if (filterValues === 'active') {
            return tasks.filter(t => t.isDone === false)
        } else if (filterValues === 'completed') {
            return tasks.filter(t => t.isDone === true)
        } else {
            return tasks
        }*/
        return filterValues === 'active'
            ? tasks.filter(t => t.isDone === false)
            : filterValues === 'completed'
                ? tasks.filter(t => t.isDone === true)
                : tasks
    }

    const filteredTasks = getFilteredTasks(tasks, filterValues)

    /*const tasksForTodoList = filter === 'active'
        ? tasks.filter(t => t.isDone === false)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone === true)
            : tasks*/

    return (
        <div className="App">
            <Todolist
                changeTodoListFilter={changeTodoListFilter}
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTasks}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filterValues={filterValues}
            />
        </div>
    );
}

export default App;
