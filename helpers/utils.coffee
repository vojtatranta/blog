formatDateInst = require 'date-format'
request = require 'superagent'
Promise = require 'promise'

merge = (obj1, obj2) ->
	final = {}
	combine = (source, target) ->
		for key, value of source
			target[key] = value
		target
	combine(obj2, combine(obj1, final))

module.exports =
	merge: merge

	czechDay: (dayIndex) -> ['pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle'][dayIndex]

	dateFormat: (format, date) -> formatDateInst format, new Date(date)

	simpleRequest: (method, url) ->
		new Promise (resolve, reject) ->
			request[method](url)
			.end (err, res) -> 
				if err or res.statusCode > 300 then reject(err, res) else resolve(JSON.parse(res.text))

	isFunction: (obj) ->
		typeof obj is 'function'

	errorMessage: ->
   		alert("Uh! Something's wrong, probably due to global warming or Miloš Zeman, try again never.")

