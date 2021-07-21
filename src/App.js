import React from 'react'
import './App.css';

function App() {

  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState('')
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editing, setEditing] = React.useState('')

  React.useEffect(() => {
    const temp = localStorage.getItem('list')
    const loadedList = JSON.parse(temp)

    if (loadedList) {
      setTodos(loadedList)
    }
  }, [])
  React.useEffect(() => {
    const storage = JSON.stringify(todos)
    localStorage.setItem('list', storage)
  }, [todos])

  function handlerSubmit(e) {
    e.preventDefault()
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo('')
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editing
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditing('')
  }

  return (
    <div className="background">
      <div className="container">
        <div className='todoTitle'>
          TODO WAWI's
          <br />
          <img src='https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png' alt="" />
        </div>
        <form onSubmit={handlerSubmit}>
          <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo} />
          <button type='submit'>ADD TODO</button>
        </form>

        {todos.map((element) => <div key={element.id}>

          {todoEditing === element.id ?
            // (<input type='text' onChange={(e) => setEditing(e.target.value)} value={editing} defaultValue={element.text} />)
            (<input type='text' onChange={(e) => setEditing(e.target.value)} value={editing} placeholder={element.text} />)
            : (<div className='element'>{element.text}</div>
            )}
          <label htmlFor="">COMPLETED:</label>
          <input className='check' type="checkbox" onChange={() => toggleComplete(element.id)} checked={element.completed} />

          <button onClick={() => deleteTodo(element.id)}>DELETE</button>

          {todoEditing === element.id ?
            (<button onClick={() => editTodo(element.id)}>SUBMIT EDITED</button>)
            :
            (<button onClick={() => setTodoEditing(element.id)}>EDIT ELEMENT</button>)
          }
        <hr className='line'/>
        </div>)}
      </div>
    </div>
  );
}

export default App;
