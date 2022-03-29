import axios from 'axios';
import React, { Component } from 'react';
import './Listing.css';
import ListingDisplay from './ListingDisplay';
import CuisineFilter from '../Filter/cusineFilter';
import CostFilter from '../Filter/costFilter';
import SortFilter from '../Filter/sortFilter'

const url='https://foodiezdv.herokuapp.com/filter';

class Listing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restList:''
        }
    }

    setDataPerFilter=(data)=>{
        this.setState({restList:data})
    }

render(){
return(
    <>
        <div id="main" className="container">
            <div className="row">
                <div id="filter" className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex m-2 flex-column flex-wrap">
                    <p id="filterTitle" className="ms-sm-5">Filters</p>
                    <SortFilter restPerSort={(data) => {this.setDataPerFilter(data)}}/>
                    <CuisineFilter mealId={this.props.match.params.id}
                    restPerCuisine={(data) => {this.setDataPerFilter(data)}}/>
                    <CostFilter restPerCost={(data) => {this.setDataPerFilter(data)}}/>
                </div>
                <div id="ItemContainer" className="col-12 col-sm-12 col-md-8 col-lg-8 mt-2 ps-3">
                    <div className="row p-0 g-2">
                     <ListingDisplay restData={this.state.restList}/>   
                    </div>
                </div>
            </div> 
        </div>       
    </>    
    );
    }

        componentDidMount(){
            const mealId = this.props.match.params.id;
            sessionStorage.setItem('mealId',mealId)
            axios.get(`${url}/${mealId}`)
            .then((res) => {
                this.setState({restList:res.data})
            })
        }
    }        
export default Listing;