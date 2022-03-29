import React, { Component } from 'react';
import './Details.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import MenuDisplay from './MenuDisplay';

const url = "https://foodiezdv.herokuapp.com/restaurant"
const menuUrl = "https://foodiezdv.herokuapp.com/menu"

class Details extends Component {
    constructor() {
        super();
        this.state={ details:'',
        menulist:'',
        userItem:'',
    };
    }
    
    addToCart = (data) => {
        const temp=[...this.state.userItem,data];
        this.setState({userItem:temp},()=>{
            localStorage.setItem('menu', JSON.stringify(this.state.userItem));//ading into the session storage
            localStorage.setItem('menu2',this.state.userItem);    
        })
    }

    proceed = () => {
        this.props.history.push(`/basket/${this.state.details.restaurant_name}`)
    }

    render(){
        let details = this.state.details
        localStorage.setItem('restaurant',details.restaurant_name);
        return(
        <div className="container">
            <div className="row mt-3 mb-3">
                <div className="col-sm-6 d-flex justify-content-center align-items-center">
                    <img id="rest-img" src={details.restaurant_thumb}/>
                </div>
                <div className="col-sm-6">
                    <p className="rest-title">{this.state.details.restaurant_name}</p>
                    <i className="fas fa-star checked"></i>
                    <i className="fas fa-star checked"></i>
                    <i className="fas fa-star checked"></i>
                    <i className="fas fa-star checked"></i>
                    <i className="far fa-star"></i>
                    <span>289 Customer Reviews</span>
                    <p id="rest-subtitle">Best Taste of {details.restaurant_name} At your Door or DineIn</p>
                    <div className="mb-3">
                        <div className="icon">
                            <img src="https://i.ibb.co/0KzLdwC/No-contact-delivery-final-CB432269791.png" alt="icon"/>
                            <span className="card-text">Contact Less Delivery &nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <div className="icon">
                            <img src="https://i.ibb.co/kgcsZ3z/icon-amazon-delivered-CB485933725.png" alt="icon"/>
                            <span className="card-text">Free Home Delivery</span>
                        </div>
                    </div>
                    <div><center>
                        <button className="btn btn-outline-dark my-btn me-5" onClick={this.props.history.goBack}>GO BACK</button>
                        <button className="btn btn-outline-dark my-btn" onClick={this.proceed}>CHECKOUT</button>
                    </center></div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Tabs>
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab>Contact</Tab>
                            <Tab>Menu</Tab>
                        </TabList>
                        <TabPanel>
                            <h5>
                                {details.restaurant_name}
                            </h5>
                            <p className="text-muted">
                                Manali is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                            </p>
                        </TabPanel>
                        <TabPanel>
                            <p>{details.address}</p>
                            <p>Contact No: 87665765886</p>
                        </TabPanel>
                        <TabPanel>
                            <MenuDisplay menuData={this.state.menulist}
                            finalOrder = {(data) => {this.addToCart(data)}} userItem={this.state.userItem}/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>    
        </div>
        )
    }

    async componentDidMount(){
        const restId = this.props.match.params.id;
        const response = await axios.get(`${url}/${restId}`)
        const menuResponse = await axios.get(`${menuUrl}/${restId}`)
        this.setState({details:response.data[0],menulist:menuResponse.data})
    }

}

export default Details;