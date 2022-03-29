import React,{Component} from 'react';
import axios from 'axios';
import '../Listing/Listing.css'

const url = "https://foodiezdv.herokuapp.com/filter";

class CostFilter extends Component {

    costFilter = (event) => {
        let mealId = sessionStorage.getItem('mealId');
        let cost = (event.target.value).split('-')
        let lcost = cost[0];
        let hcost = cost[1]
        let filterUrl;
        if(event.target.value === ""){
            filterUrl = `${url}/${mealId}`
        }else{
            filterUrl = `${url}/${mealId}?lcost=${lcost}&hcost=${hcost}`
        }
        axios.get(filterUrl)
        .then((res) => {this.props.restPerCost(res.data)})
    }

    render(){
        return(
            <>
                <div id="filterCost" className="ms-lg-5">
                    <div className="accordion-item">
                        <p className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Cost range
                        </button>
                        </p>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <ul type="none" onChange={this.costFilter}>
                                    <li>
                                    <input type="radio" name="cuisine" value=""/>All
                                    </li>
                                    <li>
                                    <input type="radio" name="cuisine" value="100-300"/>100-300
                                    </li>
                                    <li>
                                    <input type="radio" name="cuisine" value="301-500"/>301-500
                                    </li>
                                    <li>
                                    <input type="radio" name="cuisine" value="501-700"/>501-700
                                    </li>
                                    <li>
                                    <input type="radio" name="cuisine" value="701-1500"/>701-1500
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

export default CostFilter