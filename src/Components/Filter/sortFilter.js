import React,{Component} from 'react';
import axios from 'axios';
import '../Listing/Listing.css'

const url = "http://foodiezdv.herokuapp.com/filter";

class SortFilter extends Component {

    sortFilter = (event) => {
        let mealId = sessionStorage.getItem('mealId');
        let sortId = event.target.value;
        let filterUrl;
        if(sortId === ""){
            filterUrl = `${url}/${mealId}`
        }else{
            filterUrl = `${url}/${mealId}?sortKey=${sortId}`
        }
        axios.get(filterUrl)
        .then((res) => {this.props.restPerSort(res.data)})
    }

    render(){
        return(
            <>
                <div id="filterLocation" className="ms-lg-5">
                    <div className="accordion-item">
                        <p className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Sort
                        </button>
                        </p>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <ul type="none" list-style="none" onChange={this.sortFilter}>
                                    <li>
                                    <input type="radio" name="cuisine" value="-1"/>High To Low
                                    </li>
                                    <li>
                                    <input type="radio" name="cuisine" value="1"/>Low To High
                                    </li>
                                </ul>        
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SortFilter