import React, { Component } from 'react';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            showForm: false
        }
    }

    showForm = (e) => {
        this.setState({showForm: true});
    }
	
  render() {
    var form;
    if(this.state.showForm) form = (<ReviewForm id={this.props.id}/>);
    else form =
        (
            <button onClick={this.showForm}>
                <b>REVIEW THIS HACKATHON</b>
            </button>
        );
	  return(
		<div className="eventPage">
            <button onClick={() => this.props.mStateSetter('')}>
                <b>BACK TO HOME</b>
            </button>
            <h1 className="revItem">
                {this.props.title}
            </h1>
            {form}
            <ReviewsList
                title={this.props.title} id={this.props.id}
            />

        </div>
	  );
  }
}

export default EventPage;