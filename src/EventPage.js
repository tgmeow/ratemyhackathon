import React, { Component } from 'react';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

class EventPage extends Component {
    constructor(props) {
        super(props);
    }
	
  render() {
	  return(
		<div className="eventPage">
            <button onClick={() => this.props.mStateSetter('')}>
                HOME
            </button>

            <ReviewForm id={this.props.id}/>

            

            <ReviewsList
                title={this.props.title} id={this.props.id}
            />

        </div>
	  );
  }
}

export default EventPage;