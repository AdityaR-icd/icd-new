import React, { Component } from 'react';

import url from '~/components/fetch-url/fetch-url';
import generateKey from '~/components/global/global';

// Import Components
import FetchProjects from '~/components/project-categories/industry/sub-component/fetch-projects';

// Import CSS
import '~/components/project-categories/industry/industry.scss';

class FilterByIndustry extends Component {
  // State is a used for the data that is going to change
  
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            categories: [], // to set the empty array
        };
    }; 
    // It will executed when this element inserted in the DOM 
    componentDidMount(){
        this.fetchCategories(); // calling fetch project function to recieve project data
    }

    fetchCategories() {
      // To query graphql for requesting data 
      const requestBody = {
          query: `
              query {
                industry{
                    _id
                    name
                }
              }
          `
      };
      // fetch is used to connect the graphql so that we can make request for the data
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(requestBody), // to convert the data in the string
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(res => {
          if (res.status !== 200 && res.status !== 201) { // if result status is not 200 and 201 then it will throw an error
              throw new Error('Failed!');
          }
          return res.json(); // return result in json format
      })
      .then(resData => { 
        const categories = resData.data.industry; // assign result data in categories variable
        this.setState({ categories: categories }); // set data in categories[] after the data is recieved
      })
      .catch(err => {
          console.log(err);
      });
  }
  
  render(){
    const categories = this.state.categories.map((data) => {
        return(
            <FetchProjects category={ data.name } id={ data._id } ></FetchProjects>
        );
    });

    return (
        categories
    );
  }
}

export default FilterByIndustry;
