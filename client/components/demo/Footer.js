import React from 'react'
import FilterLink from '../../containers/demo/FilterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_TOGGLED">
      Toggled
    </FilterLink>
  </p>
)

export default Footer
