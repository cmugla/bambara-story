import React, { Component } from 'react';
import { render } from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends Component {
  render () {
    return (
    	<div>
    		<p>Hello React! We the best I telllllling you</p>
    		<AwesomeComponent />
    	</div>
    )
  }
}

render(<App/>, document.getElementById('app'));