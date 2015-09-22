React = require 'react'
{connect} = require 'react-redux'
actions = require '../actions'
{matchesFilters} = require '../helpers/tasks'
Circle = require './AjaxCircle'
TodoForm = require './TodoForm'
Task = require './Task'
Pagination = require './Pagination'

mapStateToProps = (state) ->
	tasks: state.tasks
	isFetching: state.isFetching
	user: state.user
	tasksFilters: state.tasksFilters
	token: state.token
	limit: state.limit
	page: state.page

module.exports = connect(mapStateToProps, actions) React.createClass

	toggleCompletedDisplay: ->
		if @props.tasksFilters['completed']? then @props.clearCompletedTasksFilter() else @props.setCompletedTasksFilter()

	changeLimit: (newLimit) ->
		@props.changeLimit(newLimit)
		@props.changePage(0)

	render: ->
		<div className="tasks-wrapper">
			<div className="app-brand">To-Do App</div>
			<div className="user-info">
			 	<span className="user-info__name">{@props.user.name}</span>
			</div>
			<div className="app-content">
				<TodoForm token={@props.token} />
				<div className="controls">
					<label htmlFor="show-completed">Completed only: <input type="checkbox" id="show-completed" onClick={@toggleCompletedDisplay} /></label>
					<Pagination changeLimit={@changeLimit} changePage={@props.changePage} limit={@props.limit} page={@props.page} max={@props.tasks.length} />
				</div>
				<ul className="task-list">
					{<Task {...task} key={i} isFetching={@props.isFetching} token={@props.token} isSubtask={false} /> for task, i in @props.tasks.filter((task) => matchesFilters(task, @props.tasksFilters)) when i + 1 > @props.page * @props.limit and i + 1 <= @props.page * @props.limit + @props.limit}
				</ul>
				<Circle shown={@props.isFetching} />
			</div>
		</div>
