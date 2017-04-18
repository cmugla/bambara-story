import React, { Component } from 'react'
import { render } from 'react-dom'
import Story from './Story.js'

export default class App extends Component {
  render () {
    return (
    	<Story />
    )
  }
}

render(<App />, document.getElementById('app'));
