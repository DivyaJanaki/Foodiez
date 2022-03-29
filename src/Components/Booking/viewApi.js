import React,{Component} from 'react';
import axios from 'axios';
import ViewDisplay from './viewDisplay'
import '../../Stylesheet/Main.css'
const url = "https://foodiezdv.herokuapp.com/orders";
const putUrl = "https://foodiezdv.herokuapp.com/updateStatus"

class viewApi extends Component{
    constructor(props){
        super(props);

        this.state={
            orders:'',
            status:'Pending'
        }
    }

    render(){
        return(<div className="container container-height">
            <ViewDisplay bookData={this.state.orders}/>
            </div>
        )
    }

    componentDidMount(){
        if(this.props.location){
            var qparams = this.props.location.search;
            if(qparams){
                var data = {
                    "date":qparams.split('&')[2].split('=')[1],
                    "bank_status":qparams.split('&')[0].split('=')[1],
                    "bank":qparams.split('&')[3].split('=')[1],
                }

                var id = qparams.split('&')[1].split('=')[1].split('_')[1]
                fetch(`${putUrl}/${id}`,{
                    method:'PUT',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                })
                .then((res)=> res.json())
                .then((data) => {
                    this.setState({status:'Delivered'})
                })
            }
        }
        // axios.get(url).then((res) => {this.setState({orders:res.data})})
        axios.get(`${url}?email=${localStorage.getItem('userdata').split(',')[1]}`).then((res) => {this.setState({orders:res.data},()=>{
                localStorage.removeItem('menu');
                localStorage.removeItem('menu2');
                localStorage.removeItem('Obj');
                localStorage.removeItem('restaurant');
            })})
      
    }
}


export default viewApi