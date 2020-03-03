import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '@src/modules-creator/Todo'
import Button from '@src/components/Button'
import Input from '@src/components/Input'
import List from '@src/components/List'

function Todo ({ moduleName }) {
  const dispatch = useDispatch()
  const [newTodoName, setTodoName] = useState('')
  const isPostingTodo = useSelector(state => state[moduleName].createTodo.isFetching)
  const isPostedTodo = useSelector(state => state[moduleName].createTodo.response.status === 200)
  const isReadingTodos = useSelector(state => state[moduleName].getTodos.isFetching)
  const isUpdatingTodo = useSelector(state => state[moduleName].updateTodo.isFetching)
  const isDeletingTodo = useSelector(state => state[moduleName].deleteTodo.isFetching)
  const todos = useSelector(state => state[moduleName].getTodos.response.data)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(actions.create(moduleName).request(newTodoName))
  }

  const handleUpdate = (todo) => {
    const updatedTodoName = prompt(`What's the new name of todo: ${todo.name}`)

    if (!updatedTodoName) {
      return
    }

    dispatch(actions.update(moduleName).request(todo.id, updatedTodoName))
  }

  const handleDelete = (todo) => {
    dispatch(actions.deleteIt(moduleName).request(todo.id))
  }

  useEffect(() => {
    dispatch(actions.read(moduleName).request())
  }, [])

  useEffect(() => {
    if (isPostedTodo) {
      setTodoName('')
    }
  }, [isPostedTodo])

  return (
    <div className='App'>

      <form onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setTodoName(e.target.value)}
          value={newTodoName}
        />
        <Button>Add</Button>
      </form>

      {isReadingTodos ? <h2>{todos.length ? 'Updating' : 'Fetching'} todos in progress...</h2> : false}
      {isPostingTodo ? <h2>Posting todos in progress...</h2> : false}
      {isUpdatingTodo ? <h2>Updating todos in progress...</h2> : false}
      {isDeletingTodo ? <h2>Deleting todos in progress...</h2> : false}

      <List
        data={todos}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  )
}

Todo.propTypes = {
  moduleName: PropTypes.string.isRequired
}

export default Todo
