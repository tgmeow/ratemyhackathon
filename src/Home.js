import React, { Component } from 'react';
import HackaItem from './HackaItem.js';

//Ideally this data is from the server, but that has not been implemented yet :)
const sumData = [
    {
        title: 'VandyHacks',
        id:'vandyhacks',
        venue:'9',
        funding:'10',
        food:'10'
    },
    {
        title: 'TimmyHacks',
        id:'timmyhacks',
        venue:'7',
        funding:'5',
        food:'2'
    },
    {
        title: 'SquirrelHacks',
        id:'squirrelhacks',
        venue:'10',
        funding:'1',
        food:'3'
    }
];

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let mList;
        if (sumData.length === 0) {
            mList = 'No results. ';
      } else{
        mList = sumData.map((listItem) => (
              <HackaItem
                key={listItem.id}
                mOnClick={this.props.mStateSetter}
                id={listItem.id}
                title={listItem.title}
                venue={listItem.venue}
                funding={listItem.funding}
                food={listItem.food}
              />
        ));
    }

        return(
            <div>
                <p>Here is where the upcoming hackathons will go</p>
			
			    <p>Here is where the list of all hackathons will go</p>
                {mList}
            </div>
        );
    }
    
}

export default Home;