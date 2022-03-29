import React, { Component } from 'react';
import '../Stylesheet/Main.css'
import {withRouter} from 'react-router-dom';


const RegisterUrl="https://developerjwt.herokuapp.com/api/auth/register"

class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            phone:'',
            email:'',
            password:''
        }
    }

    handleSubmit = () => {
        fetch(RegisterUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        // .then(this.props.history.push('/login'))
        .then(window.$('#loginForm').modal('show'));
    }
   
    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
 return  (
    <section>
    <div class="container">
      <div
        class="modal fade"
        id="LoginBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content customSignup">
            <div class="modal-header">
              <button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
              <h5 class="modal-title" id="staticBackdropLabel">Sign Up</h5>
            </div>
            <div class="modal-body fs-6">
             
               <center> <span id="userReg" class="text-center"></span><span id="userTick" style={{display:'none'}}><i class="fas fa-check fa-2x"></i></span></center>
                <div class="form-group ">
                  <div class="input-group">
                    <span class="input-group-addon"> <i class="fas fa-user align-text-bottom"></i></span>
                  <input
                    class="form-control shadow-none"
                    placeholder="Enter name"
                    name="name"
                    value={this.state.name} onChange={this.handleChange}
                    id="firstname"/>
                  </div>
                  <p id="fout"></p>
                </div>
                <div class="form-group">
                  <div class="input-group">
                 <span class="input-group-addon"> <i class="fas fa-envelope-square align-text-bottom"></i></span>
                  <input
                    type="email"
                    class="form-control shadow-none"
                    id="email"
                    name="email"
                    value={this.state.email} onChange={this.handleChange}
                    placeholder="Enter Email"/></div>
                  <p id="eout"></p>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"> <i class="fas fa-mobile-alt align-text-bottom"></i></span>
                   <input
                    class="form-control shadow-none"
                    type="tel"
                    id="mobile"
                    name="phone"
                    value={this.state.phone} onChange={this.handleChange}
                    placeholder="Enter mobile number"/></div>
                  <p id="mout"></p>
                </div>
                <div class="row">
                  <div class="col-md-12 form-group">
                    <div class="input-group">
                      <span class="input-group-addon"> <i class="fas fa-lock align-text-bottom"></i></span>
                    <input
                      class="form-control shadow-none"
                      type="password"
                      name="password"
                      value={this.state.password} onChange={this.handleChange}
                      id="password"
                      placeholder="Enter password"/></div>
                    <p id="pout"></p>
                  </div>
                  {/* <div class="col-md-6 form-group">
                    <div class="input-group">
                      <span class="input-group-addon"> <i class="fas fa-lock align-text-bottom"></i></span>
                    <input
                      class="form-control shadow-none"
                      type="password"
                      name="repassword"
                      id="repassword"
                      placeholder="Re-enter password"/></div>
                  </div> */}
                </div>
                  {/* <div id="showPwdEye">
                    <button type="button" onclick="showPwd()" class="btn btn-default btn-sm">
                      <i class="fas fa-eye fa-2x"></i>
                    </button>
                    <label for="showPwd">Show Password</label>
                  </div>
                  <div id="showPwdEyeClose" style="display:none";>
                    <button type="button" onclick="dontShowPwd()" class="btn btn-default btn-sm">
                      <i class="fas fa-eye-slash fa-2x"></i>
                    </button>
                    <label for="showPwd">Don't show Password</label>
                  </div> */}
               
                <div class="modal-footer p-0">
                  <button
                    // type="submit"
                    class="btn"
                    name="submit"
                    id="submit"
                    onClick={this.handleSubmit}>
                    REGISTER
                  </button>
                  <p >Already have an account? <a href="" data-bs-target="#loginForm" data-bs-toggle="modal">&nbsp;Login</a></p>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 )}

}
export default withRouter(Register);