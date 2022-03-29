import React, { Component } from 'react';
import $ from 'jquery';


class MenuDisplay extends Component {

    // orderId=[];
    // obj=[];

    addItem = (id) => {
        const menuItems=this.props.userItem ? this.props.userItem : [];
        if(menuItems.length > 0) {
            const a=menuItems.filter(item=>Number(item)==Number(id));
            if(a==id){
            $(".alert").text(`Order ${id} is already added to cart`);
            $(".alert").fadeTo(2000, 500).slideUp(500, function() {
                $(".alert").slideUp(500);
              });
            }else{  
                this.props.finalOrder(id)
                $(".alert").text(`Success! Order ${id} is added to cart`);
                $(".alert").fadeTo(2000, 500).slideUp(500, function() {
                    $(".alert").slideUp(500);
                });
            }
        }else{   this.props.finalOrder(id)
        $(".alert").text(`Success! Order ${id} is added to cart`);
        $(".alert").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert").slideUp(500);
          });
        }
    }  

    renderMenu = ({menuData}) => {
        if(menuData){
            return menuData.map((item) => {
                return(
                    <div className="row mb-3" key={item.menu_id}>
                        <div className="col-md-2">
                            <span id="item-id">{item.menu_id}</span> &nbsp;&nbsp;
                            <img id="item-image" src={item.menu_image} alt={item.menu_name}/>
                        </div>
                        <div className="col-md-7">
                        <span id="item-name">{item.menu_name}</span>
                        <p className="mb-0">₹{item.menu_price}</p>
                            <span className="text-muted">{item.description}</span>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-outline-warning mb-1" onClick={() => {this.addItem(item.menu_id)}}>
                                <span>ADD TO CART&nbsp;<i className="fas fa-plus"></i></span>
                            </button> &nbsp;
                        </div>
                        <div className="alert alert-success alert-dismissible text-center" role="alert">
                        </div>
                    </div>
                )
            })
        }
    }
    render(){
        console.log(">>>menu",this.props)
        return(
            <>
                <div className="col-md-12 mb-2" id="item-name"></div>
                <div className="col-md-12">
                    {this.renderMenu(this.props)}
                </div>
            </>
        )
    }
}

export default MenuDisplay;
