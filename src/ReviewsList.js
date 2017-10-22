import React, { Component } from 'react';
import ReviewItem from './ReviewItem.js';
import axios from 'axios';

const DATA_HOST = 'https://ratemyhackathon.herokuapp.com/data/reviews';

function getPageElements(id, callback) {
    let url = DATA_HOST + '?id=' + id;
    //console.log(url);
    axios.get(url)
        .then(res => {
            const data = res.data.data;
            if (typeof callback === 'function') callback(data);
        });
    //TODO ERROR HANDLING
}

class ReviewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        console.log('Mounted: ' + this.props.id);
        getPageElements(this.props.id, function (newData) {
            this.setState({ data: newData });
        }.bind(this));
        //load first page
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.id !== this.props.id) {
    //         console.log('Updated: ' + this.props.id);
    //         getPageElements(this.props.id, function (newData) {
    //             this.setState({ data: newData });
    //         }.bind(this));
    //     }
    // }
	
  render() {
      let mReviews;
      if (this.state.data.length === 0) {
        mReviews = 'No results. ';
    } else{
        mReviews = this.state.data.map((reviewItem) => (
            <ReviewItem
                key={reviewItem.created_date}
                id={reviewItem.id}
                title={reviewItem.title}
                venue={reviewItem.venue}
                funding={reviewItem.funding}
                food={reviewItem.food}
                recommend={reviewItem.recommend.data}
                reimburse={reviewItem.reimburse}
                comments={reviewItem.comments}
            />
        ));
    }
	  
	  return(
        <div>
            <table className="revList">
                <tr>
                    <th className="reviewHead">Title</th>
                    <th className="reviewHead">Venue</th>
                    <th className="reviewHead">Funding</th>
                    <th className="reviewHead">Food</th>
                    <th className="reviewHead">Recommend</th>
                    <th className="reviewHead">Reimburse</th>
                    <th className="reviewHead">Comments</th>
                </tr>
            {mReviews}
            </table>
        </div>
	  );
  }
}

export default ReviewsList;