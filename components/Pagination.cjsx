React = require 'react'
cx = require 'classnames'

module.exports = React.createClass
	
	canGoNext: -> @props.page + 1 < Math.ceil(@props.max / @props.limit)

	canGoPrev: -> @props.page - 1 > -1

	goToPrevPage: ->
		@props.changePage(@props.page - 1) if @canGoPrev()

	goToNextPage: ->
		@props.changePage(@props.page + 1) if @canGoNext()

	limitChanged: ->
		@props.changeLimit(parseInt(@refs.limit.getDOMNode().value))

	countDisplaying: (page, limit, currentlyDisplaying) ->
		page * limit + currentlyDisplaying

	render: ->
		offset = @props.page * @props.limit
		<div className="pagination">
			<label htmlFor="limit">Number of items: <select id="limit" ref="limit" value={@props.limit} onChange={@limitChanged}><option value="1">1</option>{<option key={i} value={i}>{i}</option> for i in [10..50] by 10}</select></label>
			<div className="paging">
				<small>{offset} - {@countDisplaying(@props.page, @props.limit, @props.currentlyDisplaying)} of {@props.max} </small>
				{<span className={cx 'page-prev page-control': true, 'disabled': not @canGoPrev()} onClick={@goToPrevPage}><</span>}
				<span className="current-page">{@props.page + 1}</span>
				{<span className={cx 'page-next page-control': true, 'disabled': not @canGoNext()} onClick={@goToNextPage}>></span>}
			</div>
		</div>