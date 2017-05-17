import React from 'react'
import { render } from 'react-dom'
import ImmutableTable from './components/ImmutableTable'
import EditableTable from './components/EditableTable'

render(
  <div>
    <EditableTable />
  </div>,
  document.getElementById('root')
)
