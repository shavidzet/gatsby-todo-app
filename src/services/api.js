import axios from 'axios'

export const fetchTodos = () =>
  axios
    .get('https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todos')

export const addTodo = (name) =>
  axios
    .post('https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo', { name })

export const updateTodo = (id, name) =>
  axios
    .put(`https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo?id=${id}`, { name })

export const deleteTodo = (id, name) =>
  axios
    .delete(`https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo?id=${id}`, { name })
