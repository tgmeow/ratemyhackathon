import React, { Component } from 'react';
import './App.css';

import HackaItem from './HackaItem.js';

class App extends Component {
  render() {
	  //Body switches to display hackathon info on click.
	  let body = (
		<body>
			<h1>Upcoming Hackathons</h1>
			<p>Here is where the upcoming hackathons will go</p>
			
			<p>Here is where the list of all hackathons will go</p>
			
			<HackaItem></HackaItem>
		</body>
	  )
	  //RENDER HACKAITEMS AND THEN SHOW
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rate My Hackathon</h1>
        </header>
		{body}
      </div>
    );
  }
}

export default App;
