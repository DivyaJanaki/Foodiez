import React,{Component} from 'react';
import axios from 'axios';
import '../Listing/Listing.css'

const url = "https://foodiezdv.herokuapp.com/filter";

class CuisineFilter extends Component {

    cuisineFilter = (event) => {
        let mealId = this.props.mealId;
        let cuisineId = event.target.value;
        let filterUrl;
        if(cuisineId === ""){
            filterUrl = `${url}/${mealId}`
        }else{
            filterUrl = `${url}/${mealId}?cuisine=${cuisineId}`
        }
        axios.get(filterUrl)
        .then((res) => {this.props.restPerCuisine(res.data)})
    }

    render(){
        return(
                <div id="filterCuisine" className="ms-lg-5">
                        <div className="accordion-item">
                            <p className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Cuisine choice
                            </button>
                            </p>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul type="none" list-style="none" onChange={this.cuisineFilter}>
                                        <li>
                                        <input type="radio" name="cuisine" value=""/>All
                                        </li>
                                        <li>
                                        <input type="radio" name="cuisine" value="1"/>North Indian
                                        </li>
                                        <li>
                                        <input type="radio" name="cuisine" value="2"/>South Indian
                                        </li>
                                        <li>
                                        <input type="radio" name="cuisine" value="3"/>Chinese
                                        </li>
                                        <li>
                                        <input type="radio" name="cuisine" value="4"/>Fast Food
                                        </li>
                                        <li>
                                        <input type="radio" name="cuisine" value="5"/>Street Food
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default CuisineFilter