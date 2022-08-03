import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { ServiceConfiguration } from 'meteor/service-configuration'

import { TasksCollection } from '/imports/api/TasksCollection'

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  })

const SEED_USERNAME = 'meteorite'
const SEED_PASSWORD = 'password'

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME)

  if (TasksCollection.find().count() === 0) {
    ;[
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user))
  }
})

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: 'c1dba154880cad0732a1', // insert your clientId here
      secret: '4d5c358cbe3795e952aaca28ce026350f8998999', // insert your secret here
    },
    // $set: {
    //   loginStyle: 'popup',
    //   clientId: process.env.GITHUB_CLIENT_ID, // insert your clientId here
    //   secret: process.env.GITHUB_CLIENT_SECRET, // insert your secret here
    // },
  }
)
