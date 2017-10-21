import React, { Component } from 'react';
import './App.css';

import 'HackaItem.js';

class App extends Component {
  render() {
	  
	  //RENDER HACKAITEMS AND THEN SHOW
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rate My Hackathon</h1>
        </header>
		
		<body>
			Here is where the upcoming hackathons will go
			and
			Here is where the list of all hackathons will go
			
			<HackaItem></HackaItem>
		</body>
      </div>
    );
  }
}

export default App;
