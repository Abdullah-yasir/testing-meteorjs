import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection.js'

import { Task } from './Task.jsx'
import { TaskForm } from './TaskForm.jsx'

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  )

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <TaskForm />
      {tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  )
}
