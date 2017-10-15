import React from 'react'
import ReactDom from 'react-dom'
import Actions from '../components/Actions'

const reactElements = (
  <div className="container">
    <Actions />
  </div>
)

ReactDom.render(
  reactElements,
  document.getElementById('react')
)
