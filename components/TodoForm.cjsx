React = require 'react'
{connect} = require 'react-redux'
actions = require '../actions'

module.exports =  connect((-> {}), actions) React.createClass
	
	addTodo: (e) ->
		e.preventDefault()
		@props.addTask(@props.token, @refs.label.getDOMNode().value)
		@refs.form.getDOMNode().reset()

	render: ->
		<form className="new-task-form" onSubmit={@addTodo} ref="form">
			<input className="text-input new-task-form__label-input" ref="label" type="text" name="label" placeholder="Label..." />
			<button className="button new-task-form__submit-button" type="submit">Add Task</button>
		</form>