import axios from 'axios';
import React from 'react'
import { CiEdit, CiTrash } from "react-icons/ci";
import { baseURL } from './constant';


const List = ({id, task, setUpdateUI, updateMode}) => {
    const removeTask = () => {
        axios.delete(`${baseURL}/delete/${id}`)
        .then((res) => {
            console.log(res);
            setUpdateUI((prevState) => !prevState)
        })
    }
  return (
    <li className='w-full mb-2
    bg-gray-300 flex gap-2
    justify-between items-center
    p-2'>
        {task}
        <div className='flex gap-2
        p-2 cursor-pointer'>
        <CiEdit 
            onClick={() => updateMode(id, task)}
        />
        <CiTrash 
            onClick={removeTask}
        />
        </div>
    </li>
  )
}

export default List
