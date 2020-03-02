import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  create,
  read,
  update,
  deleteIt
} from '@src/modules/Todo/actions'

const todoItem = (handleUpdate, handleDelete) => (todo) => (
  <li
    key={todo.id}
  >
    <span>{todo.name}</span>
    <button onClick={() => handleUpdate(todo)}>Rename</button>
    <button onClick={() => handleDelete(todo)}>Delete</button>
  </li>
)

function Todo () {
  const dispatch = useDispatch()
  const [newTodoName, setTodoName] = useState('')
  const isPostingTodo = useSelector(state => state.todos.createTodo.isFetching)
  const isPostedTodo = useSelector(state => state.todos.createTodo.response.status === 200)
  const isReadingTodos = useSelector(state => state.todos.getTodos.isFetching)
  const isUpdatingTodo = useSelector(state => state.todos.updateTodo.isFetching)
  const isDeletingTodo = useSelector(state => state.todos.deleteTodo.isFetching)
  const todos = useSelector(state => state.todos.getTodos.response.data)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(create.request(newTodoName))
  }

  const handleUpdate = (todo) => {
    const updatedTodoName = prompt(`What's the new name of todo: ${todo.name}`)

    if (!updatedTodoName) {
      return
    }

    dispatch(update.request(todo.id, updatedTodoName))
  }

  const handleDelete = (todo) => {
    dispatch(deleteIt.request(todo.id))
  }

  useEffect(() => {
    dispatch(read.request())
  }, [])

  useEffect(() => {
    if (isPostedTodo) {
      setTodoName('')
    }
  }, [isPostedTodo])

  return (
    <div className='App'>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTodoName(e.target.value)}
          value={newTodoName}
        />
        <button>Add</button>
      </form>

      {isReadingTodos ? <h2>{todos.length ? 'Updating' : 'Fetching'} todos in progress...</h2> : false}
      {isPostingTodo ? <h2>Posting todos in progress...</h2> : false}
      {isUpdatingTodo ? <h2>Updating todos in progress...</h2> : false}
      {isDeletingTodo ? <h2>Deleting todos in progress...</h2> : false}

      <div>
        <ul>
          {todos.map(todoItem(handleUpdate, handleDelete))}
        </ul>
      </div>
    </div>
  )
}

export default Todo
