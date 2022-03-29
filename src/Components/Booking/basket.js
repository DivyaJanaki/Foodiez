import React, { Component } from 'react';
import './basket.css';
import $ from 'jquery';

const url="https://foodiezdv.herokuapp.com/cart";

//http://localhost:8122/cart?mealId=65,70

class basket extends Component {
constructor(props) {
    super(props);
    this.state = {
        id:Math.floor(Math.random()*10000),
        hotel_name:this.props.match.params.restName,
        name:'',
        phone:'',
        email:'',
        cost:0,
        address:'',
        menuItems:'',
        restaurant:'',
        myid:'',
        MyId:[],
        myItems:[]

    }
}

addQty = (id,quantity) =>{
let menuDetails = [];
this.state.menuItems.map(item=>{
    if(item.id==id){
    var myObj = {};
    myObj.id=item.id;
    myObj.name = item.name;
    myObj.img = item.img;
    myObj.price=item.price;
    myObj.quantity=item.quantity+1;
    menuDetails.push(myObj);
    return 'ok';
}else{
    var myObj = {};
    myObj.id=item.id;
    myObj.name = item.name;
    myObj.img = item.img;
    myObj.price=item.price;
    myObj.quantity=item.quantity;
    menuDetails.push(myObj);
    return 'ok';
}});
 this.setState({menuItems:menuDetails},()=>{this.cartTotal()})
}

reduceQty = (id,quantity) =>{
    if(quantity>=2){
    let menuDetails = [];
    this.state.menuItems.map(item=>{
        if(item.id==id){
        var myObj = {}
        myObj.id=item.id;
        myObj.name = item.name;
        myObj.img = item.img;
        myObj.price=item.price;
        myObj.quantity=item.quantity-1;
        menuDetails.push(myObj);
        return 'ok'
    }else{
        var myObj = {}
        myObj.id=item.id;
        myObj.name = item.name;
        myObj.img = item.img;
        myObj.price=item.price;
        myObj.quantity=item.quantity;
        menuDetails.push(myObj);
        return 'ok';
    }});
     this.setState({menuItems:menuDetails},()=>{this.cartTotal()})
    }else{//call remove item}
    }
}

removeItem = (data) => {
const newCartItems = this.state.menuItems.filter(item => item.id !== data);
this.setState({menuItems:newCartItems},()=>{this.cartTotal()});
let id = this.state.myItems.indexOf(data); 
this.state.myItems.splice(id,1);
localStorage.setItem('menu2',this.state.myItems);
}

proceed = () => {
    if(localStorage.getItem('userdata')!==null){
    this.props.history.push(`/placeOrder/${this.state.restaurant}`);
    localStorage.setItem('Obj',JSON.stringify(this.state.menuItems));
    }else{
        $(".alert").text(`Kindly Login first to proceed to checkout`);
        $(".alert").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert").slideUp(500);
          }); 
    }
}

cartTotal = () =>{
    let total=0;
    this.state.menuItems.map(item=>{
        total=total+(item.price*item.quantity);
    });
    this.setState({cost:total});
}

renderItems = (data) => {
    if(data){
        return data.map((item,index) => {
            return(
                <div className="row g-2 mb-3 orderItems" id={item.id} key={index}>
                    <div className="col-md-1">{item.id}.</div>    
                    <div className="col-md-2">
                        <img src={item.img} alt={item.name} className="cart-img"/>
                    </div>
                    <div className="col-md-4">
                        <p className="cart-name">{item.name}</p>
                    </div>
                    <div className="col-md-1">
                    <p className="cart-price">₹{item.price}</p>
                    </div>
                    <div className="col-md-2">
                    <button className="btn btn-outline-warning p-2" onClick={()=>this.addQty(item.id,item.quantity)}>
                        <i className="fas fa-plus" ></i>
                    </button>
                    <label id="qty" className="m-1" type="text" disabled>{item.quantity}</label>
                    <button className="btn btn-outline-warning p-2" onClick={()=>this.reduceQty(item.id,item.quantity)}>
                   <i className="fas fa-minus"></i>
                    </button>
                    </div>
                    <div className="col-md-2">
                    <button className="btn btn-outline-danger mb-1" onClick={() => {this.removeItem(item.id)}}>
                            <span>REMOVE ITEM</span>
                            </button> 
                    </div>
                    <div className="alert alert-success alert-dismissible text-center" role="alert"></div>
              </div>
        )});
    }else{
       return <div><center>Your cart is empty</center></div>
    }
}

   

handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value});
}

render(){
    return(
            <div className="container-fluid mx-2">
                <div className="container">
                    <div className="container mt-4">
                        <div className="container mt-4 mb-4 pb-4 pt-2" id="cart-items">
                            <h3 className="row title justify-content-center">Your Cart Items</h3>  
                            {this.renderItems(this.state.menuItems)}
                            <input type="hidden" name="amount" value={this.state.cost}/>
                            <input type="hidden" name="id" value={this.state.id}/>
                            <input type="hidden" name="hotel_name" value={this.state.rest_name}/>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2>Total Cost is Rs.{this.state.cost}</h2>
                                    </div>
                                    <div className="col-md-6 text-end">
                                    <button className="btn btn-success btn-proceed"  onClick={this.proceed}
                                    type="submit">Place your order &nbsp;&nbsp;&nbsp;<i className="fas fa-long-arrow-alt-right fa-2x"></i></button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>    
    );
}

componentDidMount(){
    let myItems = localStorage.getItem('menu2');
    if(myItems){
        let temp=[];
        myItems.split(',').map((item) => {
            console.log(item);
        temp.push(Number(item))
            return 'ok'
        })
        console.log(temp);
    this.setState(prevState => ({
        myItems: [...prevState.myItems, ...temp],
      }));
    var rest = localStorage.getItem('restaurant');
    this.setState({restaurant:rest});

    if(localStorage.getItem("Obj")===null){
    let CartUrl = `${url}?mealId=${myItems}`;
    fetch(CartUrl, {method:'GET'})
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
                myObj.quantity=1;
                myObj.id=item.menu_id;
                menuDetails.push(myObj);
                return 'ok'
            })
            // this.setState({menuItems:data})
            this.setState({cost:totalPrice,menuItems:menuDetails},()=>{console.log(this.state.menuItems)})
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
}}

}
}

export default basket;