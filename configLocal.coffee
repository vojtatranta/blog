{merge} = require './helpers/utils'

localConfig =
	API_KEY: 'avcd-todo-app-a1b3d6'

module.exports = merge require('./config'), localConfig