import React,{ Component} from 'react';
import {Link} from 'react-router-dom';
import '../Stylesheet/Header.css';
import Login from './login';
import Register from './Register';
import {withRouter} from 'react-router-dom';

const url = "https://developerjwt.herokuapp.com/api/auth/userinfo";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: '',
            userdata:''
        };
    }

    handleLogout = () => {
        this.setState({userdata:''},()=>{
            localStorage.removeItem('userdata')
            localStorage.removeItem('ltk')
            this.props.history.push('/')
        });
    }

    renderCounter = (data) =>{
        if(data) {
        this.setState({count:data})
       return( <span id="count" className="position-absolute badge rounded-pill bg-danger">
        {this.state.count}
        </span>
       )}
    }

    updateHeader = () => {
        if(localStorage.getItem('ltk')!==null){
            fetch(url,{
                method: 'GET',
                headers:{
                    'x-access-token':localStorage.getItem('ltk')
                }
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    userdata:data
                })
                let outputArray = [data.name,data.email,data.phone,data.role]
                localStorage.setItem('userdata',outputArray);
            })
        }
    }
   
    render() {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    
                    <Link className="navbar-brand" to="/"><i className="fas fa-utensils fa-1.5x align-text-bottom"></i>&nbsp;Foodiez</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    {this.state.userdata.name ? <span id="name-placeholder" className="px-5"><i class="fas fa-user-circle"></i>{` ${this.state.userdata.name} Hi`}</span> : null}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav text-center ms-auto">
                             <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                {
                                (!this.state.userdata.name) &&
                                <a className="nav-link" aria-current="page" href="" data-bs-toggle="modal" data-bs-target="#loginForm">Login</a>
                                }
                                 {
                                (this.state.userdata.name) &&
                                <a className="nav-link" aria-current="page" href="" onClick={this.handleLogout}>Logout</a>
                                }
                                </li>
                            <li className="nav-item">
                                <Link to="/aboutUs" className="nav-link">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/basket" className="nav-link"><i className="fas fa-shopping-cart">
                               {this.renderCounter(this.props.count)}
                                </i>
                               </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Register/>
            <Login updateUser={()=>this.updateHeader()}/>
        </>
    );}

    componentDidMount(){
        if(localStorage.getItem('ltk')!==null){
        fetch(url,{
            method: 'GET',
            headers:{
                'x-access-token':localStorage.getItem('ltk')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                userdata:data
            })
            let outputArray = [data.name,data.email,data.phone,data.role]
            localStorage.setItem('userdata',outputArray);
        })
    }
}
}

export default withRouter(Header);