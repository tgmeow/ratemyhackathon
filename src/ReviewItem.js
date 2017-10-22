import React, { Component } from 'react';

class ReviewItem extends Component {
    constructor(props) {
        super(props);
    }
	
  render() {
	  
	  return(
		<tr>
            <td>{this.props.title}</td>
            <td>{this.props.venue}</td>
            <td>{this.props.funding}</td>
            <td>{this.props.food}</td>
            <td>{this.props.recommend}</td>
            <td>{this.props.reimburse}</td>
            <td>{this.props.comments}</td>
        </tr>
	  );
  }
}

export default ReviewItem;