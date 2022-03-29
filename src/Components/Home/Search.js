import React,{Component} from 'react';
import '../../Stylesheet/Search.css';
import {withRouter} from 'react-router-dom';

const locationUrl='https://foodiezdv.herokuapp.com/location';
const restUrl = "https://foodiezdv.herokuapp.com/restaurants?city=";


class Search extends Component{
    constructor(props){
        super(props);

        this.state = {
            location:'',
            restaurants:''
        }
    }

    renderCity = (data) => {
        if(data){
        return data.map((item)=>{
            return(
                <option key={item.location_id} value={item.state_id}>{item.state}</option>
            )
        })
        }
    }

    handleDetails = (event) => {
        console.log("in search>>>>",this.props)
        this.props.history.push(`/details/${event.target.value}`)
    }
    renderRestaurants = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option key={item.restaurant_id} value={item.restaurant_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
    }

    handleRest = (event) => {
        console.log(event.target.value)
        fetch(`${restUrl}${event.target.value}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restaurants:data})
        })
    }

    render(){
        return(
            <div className="searchContainer">
                <div className="container-fluid p-0 text-center pt-5" id="heading">
                    <span id="heading">Find the best place near you</span>
                </div>
                <div className="container-fluid text-center p-0 pt-4" id="dropdown">
                    <select className="m-2" onChange={this.handleRest}>
                        <option>-------SELECT CITY-----</option>
                        {this.renderCity(this.state.location)}
                        {/* <option hidden>Select city</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option> */}
                    </select>
                    <select className="m-2" onChange={this.handleDetails}>
                        <option>-------SELECT RESTAURANTS-----</option>
                        {this.renderRestaurants(this.state.restaurants)}
                    </select>
                </div>
            </div>
        )
    }

    //on page load call api
    componentDidMount(){
        fetch(locationUrl,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({location:data})
        })
    }
}
export default withRouter(Search);