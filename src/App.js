import React, { Component } from 'react';
import './App.css';

import Home from './Home.js';
import EventPage from './EventPage.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

  render() {
	  //Body switches to display hackathon info on click.
      var body; 
      if(this.state.id === ''){
      body = (
		<div>
			<h1>Upcoming Hackathons</h1>
			<Home
                mStateSetter={setAppState.bind(this)}
            />
		</div>
      )
    } else{
        body = (
            <div>
                <EventPage
                    mStateSetter={setAppState.bind(this)}
                    title={this.state.id}
                    id={this.state.id}
                />
            </div>
        );
    }
	  //RENDER HACKAITEMS AND THEN SHOW
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rate My Hackathon</h1>
        </header>
		{body}
		<div className = "footer">© RateMyHackathon 2017</div>
      </div>
    );
  }
}

function setAppState(eventKey) {
    console.log('App state change: ' + eventKey);
    if(this.state.id !== eventKey) this.setState({ 'id': eventKey });
}

export default App;
