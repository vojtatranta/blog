import fetch from 'isomorphic-fetch';
import request from 'superagent'
import { simpleRequest, isFunction, errorMessage } from '../helpers/utils'
import { createUpdateTaskURL, getTasksURL, crateDeleteTaskURL, getObjectFromArray } from '../helpers/tasks'
import config from '../configLocal'

export const UPDATE_TASKS = 'UPDATE_TASKS'
export const FETCHING = 'FETCHING'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const UPDATE_TASK = 'UPDATE_TASK'
export const CHANGE_PAGE_LIMIT = 'CHANGE_PAGE_LIMIT'
export const DELETE_TASK = 'DELETE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const ADD_TASKS_FILTERS = 'ADD_TASKS_FILTERS'
export const CLEAR_TASKS_FILTERS = 'CLEAR_TASKS_FILTERS'


function changeTasks(tasks) {
  return {
      type: UPDATE_TASKS,
      tasks: tasks
    }
}

function handleRequest(request, dispatch, onSuccess = null, onError = null) {
  dispatch(setFetching(true))

  request.end((error, result) => {
    dispatch(setFetching(false))
    if (error || result.statusCode > 300) {
     errorMessage()
      //logging here, selbsverstandlich
      if (isFunction(onError)) {
        onError(error, status)
      }
    } else {
      if (result.text.length > 0) {
        try {
          if (isFunction(onSuccess)) {
            onSuccess(JSON.parse(result.text))
          }     
        } catch(e) {
          //log it!
          errorMessage()
        }
      } else {
        if (isFunction(onSuccess)) {
          onSuccess()
        }
      }
      
    }
  })
  return request
}

export function setFetching(isFetching) {
  return {
    type: FETCHING,
    isFetching: isFetching
  }
}

function receiveTasks(tasks) {
  return dispatch => {
    dispatch(updateTasks(tasks))
  }
}

function fetchTasks() {
  return dispatch => {
    return fetch(`${config.baseUrl}tasks/`)
      .then(req => req.json())
      .then(json => {
        dispatch(receiveTasks(json))
      });
  }
}

export function createAddTaskAction(task) {
  return {
    type: ADD_TASK,
    task: task
  }
}

export function clearCompletedTasksFilter() {
  return {
    type: CLEAR_TASKS_FILTERS,
    filterKeys: ['completed', 'subtasks']
  }
}

export function setCompletedTasksFilter() {
  return {
    type: ADD_TASKS_FILTERS,
    filters: {
      completed: true,
      subtasks: function(subtasks) {
        if (!subtasks) {
          return true
        } else {
          return subtasks.filter(task => {
            return !task.completed
          }).length == 0
        }
      }
    }
  }
}

export function deleteTask(id, token) {
  return (dispatch, getState) => {
    let newState = getState().tasks.slice()
    let oldTask = getObjectFromArray({id}, newState, 'subtasks')
    oldTask.deleting = true
    dispatch(createUpdateTaskAction(oldTask))
    handleRequest(request.del(crateDeleteTaskURL(id, config.API_KEY, token)), dispatch, null, () => {
      oldTask.deleting = false
      dispatch(createUpdateTaskAction(oldTask))
    })
    dispatch({
      type: DELETE_TASK,
      id: id
    })
  }
}

export function createUpdateTaskAction(task) {
  return {
      type: UPDATE_TASK,
      task: task
    }
}

export function addTask(token, task) {
  return dispatch => {
    handleRequest(request.post(getTasksURL(config.API_KEY, token)), dispatch, result => {
      dispatch(createAddTaskAction(result.task))
    })
  }
}

export function updateTask(id, token, task, optimistic = false, optimisticOnly = false) {
  return (dispatch, getState) => {
    let oldTask = getObjectFromArray({id}, getState().tasks.slice(), 'subtasks')
    let newTask = Object.assign({}, oldTask, task)
    if (!optimisticOnly) {
      handleRequest(request.post(createUpdateTaskURL(id, config.API_KEY, token)), dispatch, result => {
        try {
            let response = JSON.parse(result.text)
          } catch(e) {
            return errorMessage()
          }
          dispatch(createUpdateTaskAction(result.text.task))
        }, (error, status) => {
          dispatch(updateTask(id, token, oldTask, true, true))
        })
    }
   
    if (optimistic) {
      dispatch(createUpdateTaskAction(newTask))
    }
   
  }
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page: page
  }
}

export function changeLimit(limit) {
  return {
    type: CHANGE_PAGE_LIMIT,
    limit: limit
  }
}
