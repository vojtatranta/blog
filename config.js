const PORT = 3333

export default {
	port: PORT,
	PROD: process.env.NODE_ENV == 'production',
	baseUrl: `http://localhost:${PORT}/`,
	API_URL: 'http://avcd-todo-api.herokuapp.com/'
}
