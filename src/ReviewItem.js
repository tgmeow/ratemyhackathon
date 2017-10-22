import React, { Component } from 'react';

class ReviewItem extends Component {
    constructor(props) {
        super(props);
    }
	
  render() {
	  
	  return(
		<div>
            <div>{this.props.title}</div>
            <div>{this.props.venue}</div>
            <div>{this.props.funding}</div>
            <div>{this.props.food}</div>
            <div>{this.props.recommend}</div>
            <div>{this.props.reimburse}</div>
            <div>{this.props.comments}</div>
        </div>
	  );
  }
}

export default ReviewItem;