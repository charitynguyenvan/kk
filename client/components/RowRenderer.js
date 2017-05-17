import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-data-grid'

export default class RowRenderer extends React.Component {

  setScrollLeft(scrollBy) {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy);
  }

  getRowStyle() {
    return {
      color: Math.random() < 0.5 ? 'green' : 'blue'
    }
  }

  render() {
    return (
      <div style={this.getRowStyle()}>
        <Row ref={ node => this.row = node } {...this.props}/>
      </div>
    )
  }
}

RowRenderer.propTypes = {
  idx: PropTypes.number.isRequired
}
