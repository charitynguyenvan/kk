import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'react-data-grid'
import ReactDOM from 'react-dom'

export default class HeaderRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.value,
      editable: false
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnEnter = this.handleOnEnter.bind(this)
  }

  setScrollLeft(scrollBy) {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy)
  }

  getRowStyle() {
    return {
      color: Math.random() < 0.5 ? 'green' : 'blue'
    }
  }

  handleDoubleClick() {
    this.setState({
      editable: !this.state.editable
    })
  }

  handleOnBlur(e) {
    handleOnEnter(e)
  }

  handleOnEnter(e) {
    this.setState({
      title: e.target.value,
      editable: !this.state.editable
    })
  }

  componentDidUpdate() {
    if(this.state.editable) {
      this.abc.focus()
    }
  }
  render() {
    // const {  value : title} = this.props
    console.log('title', this.state.title);
    return (
      this.state.editable ?
      <input
          onBlur={e => {
            if(e.keyCode === 13)
              this.handleOnBlur(e)}}
          onKeyDown={this.handleOnEnter}
          name="input"
          style={this.getRowStyle()}
          ref={node => { this.abc = node }}
          defaultValue={this.state.title}
      /> :
      <div onDoubleClick={this.handleDoubleClick}>{this.state.title}</div>
    )
  }
}

HeaderRenderer.propTypes = {
  value: PropTypes.string.isRequired
}
