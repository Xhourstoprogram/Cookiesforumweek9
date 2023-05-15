import './App.css';
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import Cookies from 'js-cookie';
import {useEffect, useState} from "react";

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    Cookies.set('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    const savedTasks = Cookies.get('tasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];
    setTasks(tasks);
  }, []);
  

  function addTask(name) {
    setTasks(prev => {
      const newTasks = [...prev, { name: name, done: false }];
      Cookies.set('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }
  

  function removeTask(indexToRemove) {
    setTasks(prev => {
      const newTasks = prev.filter((taskObject, index) => index !== indexToRemove);
      Cookies.set('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }
  
  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      Cookies.set('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }
  

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Reynard Timotius Purnomo(2501963261) Tasks';
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      Cookies.set('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }
  

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task,index) => (
        <Task {...task}
              onRename={newName => renameTask(index,newName)}
              onTrash={() => removeTask(index)}
              onToggle={done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;