import React, { Component } from 'react';
import ReviewsList from './ReviewsList';

class EventPage extends Component {
    constructor(props) {
        super(props);
    }
	
  render() {
	  return(
		<div>
            <button onClick={() => this.props.mStateSetter('')}>
                HOME
            </button>
            <ReviewsList
                title={this.props.title}
                id={this.props.id}
            />
        </div>
	  );
  }
}

export default EventPage;