import React, { Component } from 'react';

class ReviewItem extends Component {
    constructor(props) {
        super(props);
    }
	
  render() {
	  
	  return(
		<div>
            {this.props.title}
            {this.props.venue}
            {this.props.funding}
            {this.props.food}
            {this.props.recommend}
            {this.props.reimburse}
            {this.props.comments}
        </div>
	  );
  }
}

export default ReviewItem;