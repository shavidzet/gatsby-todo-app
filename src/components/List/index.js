import React from 'react'
import PropTypes from 'prop-types'
import Button from '@src/components/Button'

const todoItem = (handleUpdate, handleDelete) => (item) => (
  <li
    key={item.id}
  >
    <span>{item.name}</span>
    <Button onClick={() => handleUpdate(item)}>Rename</Button>
    <Button onClick={() => handleDelete(item)}>Delete</Button>
  </li>
)

const List = ({ data, handleUpdate, handleDelete }) => (
  <div>
    <ul>
      {data.map(todoItem(handleUpdate, handleDelete))}
    </ul>
  </div>
)

List.propTypes = {
  data: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default List
