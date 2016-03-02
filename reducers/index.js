import { action } from '../actions'
import { combineReducers } from 'redux'
import initialData from '../data/initial'

export function posts(state = initialData.posts, action) {
  return state
}

export default combineReducers({
  posts
})
