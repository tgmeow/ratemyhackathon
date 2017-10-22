import React, { Component } from 'react';
import './App.css';

class HackaItem extends Component {
    constructor(props) {
        super(props);
    }
	
  render() {
	  return(
          <tr>
              <td> <button onClick={() => this.props.mOnClick(this.props.id)}>
                  {this.props.title}
              </button></td>
              <td> <button onClick={() => this.props.mOnClick(this.props.id)}>
                  {this.props.venue}
              </button></td>
              <td> <button onClick={() => this.props.mOnClick(this.props.id)}>
                  {this.props.funding}
              </button></td>
              <td> <button onClick={() => this.props.mOnClick(this.props.id)}>
                  {this.props.food}
              </button></td>
          </tr>
	  );
  }
}

export default HackaItem;