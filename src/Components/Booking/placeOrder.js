import React, { Component } from 'react';
import './placeOrder.css';

const menuUrl = "https://foodiezdv.herokuapp.com/menuItem";
const orderUrl = "https://foodiezdv.herokuapp.com/placeOrder";

class placeOrder extends Component {
constructor(props) {
    super(props);
    this.state = {
        id:Math.floor(Math.random()*10000),
        hotel_name:'',
        name:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[0]:'',
        phone:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[2]:'',
        email:localStorage.getItem('userdata')?localStorage.getItem('userdata').split(',')[1]:'',
        cost:0,
        address:'john123',
        menuItems:''
    }
}

handleSubmit = () => {
    console.log(this.state);
    fetch(orderUrl,{
        method:'POST',
        headers:{
            'accept':'application/json',
            'content-type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body:JSON.stringify(this.state)
    })
    .then(this.props.history.push('/viewBooking'))
    // .then(console.log('going for payment'))
    .catch((err) =>console.error(err))
}

renderItems = (data) => {
    if(data){
        return data.map((item,index) => {
            return(
                <div className="row g-2 mb-3 orderItems" key={index}>
                    <div className="col-md-1">{index+1}.</div>    
                    <div className="col-md-2">
                        <img src={item.img} alt={item.name} className="cart-img"/>
                    </div>
                    <div className="col-md-5">
                        <p className="cart-name">{item.name}</p>
                    </div>
                    <div className="col-md-2">
                    <p className="cart-price">Quantity: {item.quantity}</p>
                    </div>
                    <div className="col-md-2">
                    <p className="cart-price">₹{item.price}</p>
                    </div>
              </div>
            )
        })
    }
}
handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value})
    console.log("this is event",+event.target.name)
}
cancel =() =>{
    this.props.history.push(`/`);
    localStorage.removeItem("menu");
    localStorage.removeItem("menu2");
    localStorage.removeItem("Obj");
    localStorage.removeItem("restaurant");
}

render(){
    return(
        <>
            <div className="container-fluid mx-2">
                <div className="container">
                    <form action="http://zompay.herokuapp.com/paynow" method="POST">
                            <div className="container mt-4">
                            <div className="row" id="personal-details">
                            <h3 className="row title justify-content-center">Personal Details</h3>    
                                <div className="col-md-6">
                                    <div className="form-group m-2">
                                        <label>Name</label>
                                        <input className="form-control" name="name"
                                        value={this.state.name} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group m-2">
                                        <label>Email</label>
                                        <input className="form-control" name="email"
                                        value={this.state.email} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                
                                <div className="col-md-6">
                                    <div className="form-group m-2">
                                        <label>Phone</label>
                                        <input className="form-control" name="phone"
                                        value={this.state.phone} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group m-2">
                                        <label>Address</label>
                                        <input className="form-control" name="address"
                                        value={this.state.address} onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div> 
                            </div>
                            <div className="container mt-4 mb-4" id="cart-items">
                            <h3 className="row title justify-content-center">Your Order Summary</h3>  
                            {this.renderItems(this.state.menuItems)}
                            <input type="hidden" name="amount" value={this.state.cost}/>
                            <input type="hidden" name="id" value={this.state.id}/>
                            <input type="hidden" name="hotel_name" value={this.state.rest_name}/>
                            <div className="row mt-3 mb-4">
                                <div className="col-md-4">
                                    <button className="btn btn-danger btn-pro" onClick={this.cancel}>Cancel Order</button>
                                </div>
                                <div className="col-md-5">
                                    <h2>Total Cost is Rs.{this.state.cost}</h2>
                                </div>
                                <div className="col-md-3">
                                <button className="btn btn-outline-success text-right btn-pro"  onClick={this.handleSubmit}
                                type="submit">Proceed to Payment</button>
                                </div>
                            </div>
                            </div>
                    </form>        
                </div>
            </div>
        </>
    );
}

    componentDidMount(){
        let menuItems = localStorage.getItem('menu2');
        let menuIds = []
        menuItems.split(',').map((item) => {
            menuIds.push(parseInt(item))
            return 'ok'
        })
        if(localStorage.getItem("Obj")===null){
        fetch(menuUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(menuIds)
        })
        .then((res) => res.json())
        .then((data) => {
            let menuDetails = [];
            let totalPrice = 0;
            data.map((item) => {
                var myObj = {}
                totalPrice = totalPrice + parseInt(item.menu_price)
                myObj.name = item.menu_name;
                myObj.img = item.menu_image;
                myObj.price=item.menu_price;
                menuDetails.push(myObj);
                return 'ok'
            })
            this.setState({cost:totalPrice,menuItems:menuDetails})
            this.setState({hotel_name:localStorage.getItem('restaurant')})
        })
    }else{
        const cartItems = localStorage.getItem('Obj') ? JSON.parse(localStorage.getItem('Obj')) : [];
        let total=0;
        let cart=[];
        cartItems.map(item=>{
            total=total+(item.price*item.quantity);
            cart.push(item);
        });
        this.setState({cost:total});
        this.setState({menuItems:cart},
            ()=>{console.log(this.state.menuItems)});
        this.setState({hotel_name:localStorage.getItem('restaurant')})
    }
    }
}

export default placeOrder;