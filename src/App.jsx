import React, { useEffect, useState } from 'react'
import './App.css'

const getLocalData = () => {
  let getData = localStorage.getItem("todo")
  if (getData) {
    return JSON.parse(localStorage.getItem("todo"))
  } else {
    return []
  }
}
function App() {

  const [todo, setTodo] = useState(getLocalData())
  const [inptVlue, setInptVlue] = useState("")
  const [editData, setEditData] = useState(null)


  console.log(todo);

  const submitHandlechng = (e) => {
    setInptVlue(e.target.value)
  }

  const submitHandle = () => {
    if (editData !== null) {
      const updatedTodos = todo.map((item, index) =>
        index === editData ? { ...item, name: inptVlue } : item
      );
      setTodo(updatedTodos);
      setEditData(null);

    } else {
      setTodo([...todo, { name: inptVlue }])
    }

    setInptVlue("")
  }
  const handalDelete = (indx) => {

    const deleteData = todo.filter((val, index) => index !== indx);
    setTodo(deleteData)
  }
  const handalEdit = (indx) => {
    const todoToEdit = todo.find((val, index) => index === indx);
    if (todoToEdit) {
      setInptVlue(todoToEdit.name);
      setEditData(indx);
    }
  };

  const handalDone = (inx) => {

    const done = todo.map((val, index) => {
      if (index === inx) {
        val.done = !val.done
      }
      return val
    })
    setTodo(done)

  }

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo))
  }, [todo])

  return (
    <>
      <h1>To Do List</h1>
      <div className="todo-container">
        <div className='todo'>
          {
            todo.map((item, index) => {

              return (
                <div key={index} >
                  <div className={item.done === true ? "todo-item-green" : "todo-item"} >
                    <div className='tdlist'>{item?.name}</div>
                    <div>
                      <button onClick={() => handalEdit(index)}>Edit</button>
                      <button className="delete-btn" onClick={() => handalDelete(index)} >Delete</button>
                      <button className="done-btn" onClick={() => handalDone(index)} >Done</button>
                    </div>
                  </div >
                </div>
              )
            })
          }
        </div>
        <div className='input-todo'>
          <h3>Add a new todo..</h3>
          <input type="text" onChange={submitHandlechng} placeholder='Add task....' value={inptVlue} />
          <button onClick={submitHandle} className='submitbtn' disabled={inptVlue.length <= 1} >Submit</button>
        </div>
        <div>
          <p>Total Todo: {todo.length}</p>

        </div>
      </div>

    </>
  )
}

export default App

function ayncOpration(callBack) {
  console.log("starting async")
  setTimeout(function () {
    callBack()
  }, 1000)
  console.log("end ");
  

}
function callBack() {
  console.log("callback start");

}
ayncOpration(callBack)