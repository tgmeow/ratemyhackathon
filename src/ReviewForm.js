import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: '',
            venue: '',
            funding: '',
            food: '',
            rec: '1',
            reimb: '',
            comments: '',
            formVisible: true
          };
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { id, title, venue, funding, food, rec, reimb, comments } = this.state;

        axios.post('/add/reviews', { id, title, venue, funding, food, rec, reimb, comments })
          .then(function(result) {
            this.setState({formVisible: false});
          }.bind(this));
      }
	
  render() {
    var form;
    if(this.state.formVisible) form = (
        <form onSubmit={this.onSubmit} method={'post'}>
          <div className = "mFormTitle">
              <label className = "formText" htmlFor={'title'}>Title:</label>
              <input className = "formInput" type={'text'} id={'title'} name={'title'} onChange={this.onChange}/>
          </div>
          <div className = "mFormItem">
              <label className = "formText" htmlFor={'venue'}>Venue Rating:</label>
              <input className = "formInput" type={'number'} name={'venue'} min={'0'} max={'10'} onChange={this.onChange}/>
          </div>
          <div className = "mFormItem">
              <label className = "formText" htmlFor={'funding'}>Sponsors/Prizes Rating:</label>
              <input className = "formInput" type={'number'} name={'funding'} min={'0'} max={'10'} onChange={this.onChange}/>
          </div>
          <div className = "mFormItem">
              <label className = "formText" htmlFor={'food'}>Food Rating:</label>
              <input className = "formInput" type={'number'} name={'food'} min={'0'} max={'10'} onChange={this.onChange}/>
          </div>
          <div className = "mFormItem">
              <label className = "formText" htmlFor={'rec'}>Recommend to Others?: </label>
              <br/> <input type="radio" name="rec" value="1" defaultChecked onChange={this.onChange}/> Yes<br/>
              <input type="radio" name="rec" value="0"onChange={this.onChange}/> No<br/>
          </div>
          <div className = "mFormItem">
              <label className = "formText" htmlFor={'reimb'}>Reimbursement:</label>
              <input className = "formInput" type={'number'} name={'reimb'} min={'0'} max={'16000000'} onChange={this.onChange}/>
          </div>
          <div className = "mFormTitle">
              <label className = "formText" htmlFor={'comments'}>Comments:</label><br/>
              <textarea className = "formInput" id={'comments'} name={'comments'} onChange={this.onChange}></textarea>
          </div>
          <div className={'submitbutton'}>
              <button type={'submit'}>Submit</button>
          </div>
      </form>
      );
      
	  return(
          <div>
            {form}
            </div>

      );

    }

}

export default ReviewForm;