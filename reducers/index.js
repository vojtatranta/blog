import { CHANGE_TASKS, ADD_TASK, ADD_TASKS_FILTERS, CLEAR_TASKS_FILTERS, UPDATE_TASK, DELETE_TASK, FETCHING, CHANGE_PAGE, CHANGE_PAGE_LIMIT } from '../actions'
import { combineReducers } from 'redux'
import { updateObjectInArray, deleteObjectInArray } from '../helpers/tasks'
import { STATE_CHANGED, LOCATION_CHANGED } from '../actions/routerActions'
import initialData from '../data/initial'

export function tasks(state = initialData.tasks, action) {
  let newState
  switch (action.type) {
    case STATE_CHANGED:
      return action.state.tasks
    case ADD_TASK:
      newState = state.slice()
      newState.push(action.task)
      return newState
    case UPDATE_TASK:
      newState = state.slice()
      return updateObjectInArray({id: action.task.id}, action.task, newState, 'subtasks')
    case DELETE_TASK:
      newState = state.slice()
      return deleteObjectInArray({id: action.id}, newState, 'subtasks')
    default:
      return state
  }
}

export function user(state = initialData.user, action) {
  switch (action.type) {
    case STATE_CHANGED:
      return action.state.user
    default:
      return state
  }
}

export function page(state = initialData.page, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.page
    default:
      return state
  }
}

export function limit(state = initialData.limit, action) {
  switch (action.type) {
    case CHANGE_PAGE_LIMIT:
      return action.limit
    default:
      return state
  }
}

export function tasksFilters(state = initialData.tasksFilters, action) {
  switch (action.type) {
    case ADD_TASKS_FILTERS:
      return Object.assign({}, state, action.filters)
    case CLEAR_TASKS_FILTERS:
      let newState = Object.assign({}, state)
      action.filterKeys.forEach(filterKey => delete newState[filterKey])
      return newState
    default:
      return state
  }
}

export function token(state = initialData.token, action) {
  switch (action.type) {
    case STATE_CHANGED:
      return action.state.token
    default:
      return state
  }
}

export function isFetching(state = initialData.isFetching, action) {
  switch (action.type) {
    case FETCHING:
      return action.isFetching
    default:
      return state
  }
}

export default combineReducers({
  tasks,
  user,
  tasksFilters,
  token,
  isFetching,
  page,
  limit
})