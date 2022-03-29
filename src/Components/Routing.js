import React,{useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';
import Listing from './Listing/Listing';
import Details from './Details/RestaurantDetails';
import placeOrder from './Booking/placeOrder';
import basket from './Booking/basket'
import viewApi from './Booking/viewApi'
import About from '../Components/About/aboutUs'

const Routing = () => {

    const [count, setValue] = useState('');

   const setCount = (data) => {
        setValue(data)
        console.log("this is count in routing: ", + count)
    }

    return(
        <BrowserRouter>
            <Header count={count}/>
                <Route exact path="/" component={Home}/>
                <Route path="/list/:id" component={Listing}/>
                <Route path="/details/:id" component={Details}/>
                <Route path="/basket" component={basket}/>
                <Route path="/placeOrder/:restName" component={placeOrder}/>
                <Route path="/viewBooking" component={viewApi}/>    
                <Route path="/aboutUs" component={About}/>      
            <Footer/>
        </BrowserRouter>
    )
}


export default Routing;