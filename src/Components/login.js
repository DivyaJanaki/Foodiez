import React, { Component } from 'react';
import '../Stylesheet/Main.css'
import {withRouter} from 'react-router-dom';

const loginUrl = "https://developerjwt.herokuapp.com/api/auth/login";

class Login extends Component {
    constructor(props){
        super(props)

        this.state={
            password:'',
            email:'',
            message:''

        }
    }

    handleSubmit = () => {
        fetch(loginUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(this.state)
        })

        .then((res) => res.json())
        .then((data) => {
            if(data.auth ===  false){
                this.setState({message:data.token});
            }else{
                localStorage.setItem('ltk',data.token)
                window.$('#loginForm').modal('hide');
                this.props.updateUser()
                // this.props.history.push('/')
            }
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
 return  (
    <section>
    <div class="container">
        <div class="modal fade" id="loginForm" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content customLogin">
                    <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <h5 class="modal-title" id="loginFormTitle">Login</h5>
                    </div>
                <div class="modal-body">
                <h3 style={{color:'red'}}>{this.state.message}</h3>
                        <div class="form-group mb-3 px-3">
                            <div class="input-group">
                            <span class="input-group-addon"> <i class="fas fa-envelope-square align-text-bottom"></i></span>
                            <input
                            type="email"
                            class="form-control shadow-none"
                            id="emailLogin"
                            name="email"
                            value={this.state.email} onChange={this.handleChange}
                            placeholder="Enter Email"
                            required/></div>
                        </div>
                        <div class="form-group mb-2 px-3">
                            <div class="input-group">
                            <span class="input-group-addon"> <i class="fas fa-lock align-text-bottom"></i></span>
                            <input
                            class="form-control shadow-none"
                            type="password"
                            name="password"
                            value={this.state.password} onChange={this.handleChange}
                            id="passwordLogin"
                            placeholder="Enter password"
                            required/>
                            </div>
                        </div>    
                        <div class="modal-footer">
                            <button class="btn" onClick={this.handleSubmit}>SIGN IN</button>
                            <p >Not a member yet? <a href="" data-bs-target="#LoginBackdrop" data-bs-toggle="modal">&nbsp;Sign Up</a></p>
                        </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    </section>)
}
}
export default withRouter(Login);