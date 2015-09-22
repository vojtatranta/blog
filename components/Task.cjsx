React = require 'react'
{connect} = require 'react-redux'
actions = require '../actions'
cx = require 'classnames'

Task = connect((-> {}), actions) React.createClass

	delete: ->
		@props.deleteTask @props.id, @props.token, true

	complete: ->
		@props.updateTask(@props.id, @props.token, completed: not @props.completed, true) if not @props.isFetching

	render: ->
		<li className={cx "task-list__item": true, 'hidden': @props.deleting? and @props.deleting}>
			<div className="task">
				<input className="task__completed-checkbox" type="checkbox" checked={@props.completed? and @props.completed} onChange={@complete} />
				<span className="task_label">{@props.label}</span>
				<span className="task__delete-button" title="Delete" onClick={@delete}></span>
			</div>
			{@props.subtasks? and <ul className="subtask-list">{@props.subtasks.map (task, i) => <Task {...task} key={i} token={@props.token} isFetching={@props.isFetching} isSubtask={true}/>}</ul>}
		</li>

module.exports = connect((-> {}), actions)(Task)

	
