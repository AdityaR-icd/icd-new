import React, { Component } from 'react';

import $ from 'jquery';

import url from '~/components/fetch-url/fetch-url';
import generateKey from '~/components/global/global';

// Import Component
import CarouselMultiple from '~/components/carousel-multiple/carousel-multiple';

class FetchProjects extends Component {
  // State is a used for the data that is going to change
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            projects: [], // to set the empty array
            expand: false,
        };
    }; 
    // It will executed when this element inserted in the DOM 
    componentDidMount(){
        this.fetchProjects(); // calling fetch project function to recieve project data
    }
    
    componentWillUnmount() {
        $('.loader').removeClass('hideLoader');
    }

    fetchProjects() {
        this.setState({ isLoading : true });
        // To query graphql for requesting data
        // To restore url params into the origin title for querying the database
        const id = this.props.id;
        const requestBody = {
          query: `
            query {
                fetchProjectByCategory(industryId:{_id: "${id}" }){
                    _id
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
            const projects = resData.data.fetchProjectByCategory; // assign result data in categories variable
            this.setState({ projects: projects, isLoading: false }); // set data in categories[] after the data is recieved
        })
        .catch(err => {
            console.log(err);
        });
    }

    // Onclick expand 
    toggleClass = () => {
        const currentState = this.state.expand;
        this.setState({ expand: !currentState });
    } 
    
    ExpandContent = (props) => {
        if( props > 3 ){
            const content = this.state.expand ? "see less project": "see more project";
            return(
                <React.Fragment>
                    <div className="expand__projects">
                        <span onClick={ this.toggleClass } className={ this.state.expand ? 'moreproject rotateArrow': 'moreproject'}>{ content }</span>
                    </div>
                </React.Fragment>
            );
        }
        else{
            return(
                <span></span>
            );
        }
    } 

  
  render(){
    if(this.state.isLoading){
        $('.loader').removeClass('hideLoader');
    } else {
        $('.loader').addClass('hideLoader');
    } 
    const projectContent = this.state.projects.map((data)=>{
        return(
            <React.Fragment>
                <div className="col-md-4">
                    <CarouselMultiple id={ data._id } type="project"></CarouselMultiple>
                    {/* <CarouselMultiple id={ data._id } type="client"></CarouselMultiple> */}
                </div>
            </React.Fragment>
        );
    });

    if(this.state.projects.length > 0){
        return (
            <React.Fragment>
                <section className={ this.state.expand ? 'mB__80 industry__filter show': 'mB__80 industry__filter'} >
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <span className="project__category">{ this.props.category } { /* this.state.projects.length */ }</span>
                            </div>
                            <div className="col-12">
                                { this.ExpandContent(this.state.projects.length) }
                            </div>
                        </div>
                        <div className="row">
                            {projectContent}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    } else {
        return null; 
    } 
  }
}

export default FetchProjects;
