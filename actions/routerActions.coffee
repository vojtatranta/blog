request = require 'superagent'
{ setFetching } = require './'
{ baseUrl } = require '../configLocal'
{ errorMessage } = require '../helpers/utils'

LOCATION_CHANGED = 'LOCATION_CHANGED'
STATE_CHANGED = 'STATE_CHANGED'

stateChanged = (state) ->
	type: STATE_CHANGED
	state: state

locationChanged = (path) ->
	type: LOCATION_CHANGED
	location: path

loadState = (path) ->
	(dispatch, getState) ->
		dispatch setFetching(true)
		request.get path
		.set 'accept', 'application/json'
		.end (err, res) ->
			state = JSON.parse res.text
			state.location = path
			dispatch stateChanged(state)
			dispatch setFetching(false)

module.exports.changeLocation = (path) ->
	(dispatch, getState) ->
		dispatch loadState(path) if getState().location isnt path

validateRedirectRequest = (err, result) ->
	try
		response = JSON.parse(result.text)
	catch e
		return false

	if err or result.statusCode >= 400 or not response.location? then false else response

###
	This is bad...
###
module.exports.resolveRedirect = (url, router) ->
	return (dispatch) ->
		request.get(url)
		.accept('application/json')
		.end (err, result) ->
			response = validateRedirectRequest(err, result)
			if not response then errorMessage() else router.transitionTo(response.location)

module.exports.LOCATION_CHANGED = LOCATION_CHANGED
module.exports.STATE_CHANGED = STATE_CHANGED