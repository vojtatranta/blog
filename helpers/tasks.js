import config from '../configLocal'

export function getTasksAPIURL() {
	return `${config.API_URL}tasks/`
}

export function createTaskURL(id, api_key, access_token) {
	return `${getTasksAPIURL()}?${buildQuery({id: id, api_key: api_key, access_token: access_token})}`
}

export function buildQuery(queryObj) {
	return Object.keys(queryObj).map((key) => {
		return `${key}=${queryObj[key]}`
	}).join('&')
}

export function createAuthQuery(api_key, access_token) {
	return buildQuery({api_key, access_token})
}

export function getTasksURL(api_key, access_token) {
	return `${getTasksAPIURL()}?${createAuthQuery(api_key, access_token)}`
}

export function createUpdateTaskURL(id, api_key, access_token) {
	return `${getTasksAPIURL()}${id}?${buildQuery({api_key, access_token})}`
}

export function crateDeleteTaskURL(id, api_key, access_token) {
	return createUpdateTaskURL(id, api_key, access_token)
}

export function getLoginURL(api_key) {
	return `${config.API_URL}login/?${buildQuery({api_key})}`
} 

/**
	All this stuff down here really needs big tests, believe me, I can write test, but I am finished with this :)) :-*
**/
export function getObjectFromArray(searchBy, arrayOfObjects, nestingKey = null) {
	for (let obj of arrayOfObjects) {
		let match = null
		Object.keys(searchBy).forEach((key) => {
			if (obj[key] == searchBy[key]) {
				match = obj
			}
		})
		if (match) {
			return match
		} else {
			if (nestingKey && obj[nestingKey]) {
				match = getObjectFromArray(searchBy, obj[nestingKey], nestingKey)
				if (match) {
					return match
				}
			}
		}
	}
	return null
}

export function matchesFilters(task, filters) {
	for (let key in filters) {
		let condition = typeof filters[key] === 'function' ? !filters[key](task[key]) : task[key] != filters[key]
		if (condition) {
			return false
		}
	}
	return true
}

export function deleteObjectInArray(searchBy, arr, nestingKey = null) {
	return updateObjectInArray(searchBy, {}, arr, nestingKey, (item, index, arr) => {
		delete arr[index]
	})
}

export function updateObjectInArray(searchBy, updateObj, arr, nestingKey = null, onMatch = null) {
		return arr.map((item, index) => {
			let keyToSearch = null
			Object.keys(searchBy).forEach(key => {
				keyToSearch = key
			})				
			if (item[keyToSearch] == searchBy[keyToSearch]) {
				if (typeof match === 'function') {
					onMatch(item, index, arr)
				}
				return Object.assign({}, item, updateObj) 
			} else {
				if (nestingKey && item[nestingKey]) {
					item[nestingKey] = updateObjectInArray(searchBy, updateObj, item.subtasks, nestingKey)
				}
				return item
			}
		})
}