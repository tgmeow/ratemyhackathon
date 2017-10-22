import React, { Component } from 'react';

class HackaItem extends Component {
    constructor(props) {
        super(props);
    }
	
  render() {
      console.log("HackaItemMe");
	  //onClick={this.props.mOnClick(this.props.id)}
	  return(
            <div>
                <button onClick={() => this.props.mOnClick(this.props.id)}>
                    {this.props.title}        
                </button>
                <p>
                    {this.props.id}
                    {this.props.venue}
                    {this.props.funding}
                    {this.props.food}
                </p>
            </div>
	  );
  }
}

export default HackaItem;