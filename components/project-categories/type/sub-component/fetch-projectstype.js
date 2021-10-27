import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';

import url from '~/components/fetch-url/fetch-url';
import generateKey from '~/components/global/global';

// Import Component
import CarouselMultiple from '~/components/carousel-multiple/carousel-multiple';

class FetchProjectsType extends Component {
  // State is a used for the data that is going to change
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            projectsType: [], // to set the empty array
            // expand: false,
            isLoading: false,
        };
    }; 
    // It will executed when this element inserted in the DOM 
    componentDidMount(){
        this.fetchProjects(); // calling fetch project function to recieve project data
    }

    fetchProjects() {
        this.setState({ isLoading : true });
        // To query graphql for requesting data
        // To restore url params into the origin title for querying the database
        const id = this.props.id;
        const requestBody = {
          query: `
            query {
                fetchProjectByType(typeId:{_id:"${ id }"}){
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
            const projectsType = resData.data.fetchProjectByType; // assign result data in categories variable
            this.setState({ projectsType: projectsType, isLoading : false }); // set data in categories[] after the data is recieved
            // console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    // Onclick expand 
    // toggleClass = () => {
    //     const currentState = this.state.expand;
    //     this.setState({ expand: !currentState });
    // } 
    
    // ExpandContent = (props) => {
    //     const content = this.state.expand ? "see less project": "see more project";

    //     if( props > 3 ){
    //         return(
    //             <div className="expand__projects">
    //                 <span onClick={ this.toggleClass } className={ this.state.expand ? 'moreproject rotateArrow': 'moreproject'}>{ content }</span>
    //             </div>
    //         );
    //     }
    //     else{
    //         return(
    //             <span></span>
    //         );
    //     }
    // } 

  
  render(){
    if(this.state.isLoading){
        $('.loader').removeClass('hideLoader');
    } else {
        $('.loader').addClass('hideLoader');
    } 
    const projectContent = this.state.projectsType.map((data)=>{
        return(
            <div className="col-md-4 project__item" key={ data._id }>
                <CarouselMultiple id={ data._id } type="project"></CarouselMultiple>
            </div>
        );
    });

    if(this.state.projectsType.length > 0){
        return (
            <React.Fragment>
                <section className="industry__filter projectType__filter">
                    {/* { this.state.expand ? 'mB__80 industry__filter show': 'mB__80 industry__filter'} */}
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <span className="project__category">{ this.props.name } { /* this.state.projectsType.length */ }</span>
                                <Link to={{ pathname: `/projects/category/${this.props.slug}` , state: { backUrl: 'true' } }} className="see-all">see all</Link>
                            </div>
                            {/* <div className="col-md-6">
                                { this.ExpandContent(this.state.projectsType.length) }
                            </div> */}
                        </div>
                        <div className="project__scroll">
                            <div className="row project__row">
                                {projectContent}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    } else {
        return (null);
    }  
  }
}

export default FetchProjectsType;
