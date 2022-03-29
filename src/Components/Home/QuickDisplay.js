import React from 'react';
import {Link} from 'react-router-dom';

const QuickDisplay = (props) => {
    const renderMeal = ({quickData}) => {
        if(quickData){
            return quickData.map((item,index) => {
                return(
                    <div className="col-12 col-sm-6 col-lg-4" key={index}>
                        <Link to={`/list/${item.mealtype_id}`} key={item.mealtype_id}>
                        <div className="card mb-3" id="customCard">
                            <div className="row g-0">
                                <div className="col-sm-5">
                                    <img src={item.meal_image} className="img-fluid" alt={item.mealtype} style={{height:'161px'}}/>
                                </div>
                                <div className="col-sm-7">
                                    <div className="card-body">
                                        <p className="card-title">{item.mealtype}</p>
                                        <p className="card-text">{item.content}</p>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        </Link>
                    </div>
                );
            });
        }else{
           return( <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-secondary" style={{width:'5rem', height:'5rem'}} role="status">
            <span class="sr-only">Loading...</span>
            </div>
            </div>)
        }
    }

    return(
        <div className="row g-1 g-sm-4">
            {renderMeal(props)}
        </div>
    )
}

export default QuickDisplay;