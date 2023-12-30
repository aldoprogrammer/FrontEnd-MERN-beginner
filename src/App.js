import React, { useEffect, useState } from 'react'
import List from './components/List';
import { baseURL } from './components/constant';
import axios from 'axios';
const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`)
    .then((res) => {
      console.log(res.data)
      setTasks(res.data);
    })
  },[updateUI])

  const addTask= () => {
    axios.post(`${baseURL}/save`,
    {task: input})
    .then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState)
    })
  }

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  }

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`,
    {task: input})
    .then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState)
      setUpdateId(null)
      setInput("");
    })
  }

  return (
    <main className='flex flex-col
     w-[300px] mx-auto gap-2'>
      <h1 className='text-center
      text-2xl my-4 font-bold
      '
      >CRUD OPERATION</h1>
      <div className='mx-auto w-full'>
        <input 
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='bg-gray-200 p-3
          text-black w-3/5'
        />
        <button type='submit'
         className='bg-blue-500 p-3
         text-white w-2/5'
         onClick={updateId ? updateTask : addTask}
         >
          {updateId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul className='w-full mt-4'>
        {tasks.map((task) => (
          <List 
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  )
}

export default App
