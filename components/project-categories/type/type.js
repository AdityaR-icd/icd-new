import React, { Component } from 'react';

import url from '~/components/fetch-url/fetch-url';
import generateKey from '~/components/global/global';

// Import Components
import FetchProjectsType from '~/components/project-categories/type/sub-component/fetch-projectstype';


// Import CSS
import '~/components/project-categories/type/type.scss';

class FilterByType extends Component {
  // State is a used for the data that is going to change
  
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            projectType: [], // to set the empty array
        };
    }; 
    // It will executed when this element inserted in the DOM 
    componentDidMount(){
        this.fetchProjectType(); // calling fetch project function to recieve project data
    }

    fetchProjectType() {
      // To query graphql for requesting data 
      const requestBody = {
        query: `
            query {
                types{
                    _id
                    name
                    slug
                    order
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
        const projectType = resData.data.types; // assign result data in categories variable
        this.setState({ projectType: projectType }); // set data in categories[] after the data is recieved
      })
      .catch(err => {
          console.log(err);
      });
  }
  
  render(){
    const projectType = this.state.projectType.map((data) => {
        return(
            <React.Fragment>
                <FetchProjectsType id={ data._id } name={ data.name } slug={ data.slug } ></FetchProjectsType>
            </React.Fragment>
        );
    });

    return (
        projectType
    );
  }
}

export default FilterByType;
