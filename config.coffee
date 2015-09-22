PORT = 3333

module.exports = 
	port: PORT
	PROD: JSON.parse(process.env.PROD || 0)
	baseUrl: "http://localhost:#{PORT}/"
	API_URL: 'http://avcd-todo-api.herokuapp.com/'