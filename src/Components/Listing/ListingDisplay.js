import React from 'react';
import Listing from'./Listing';
import {Link} from 'react-router-dom';


const ListingDisplay = (props) => {
    const renderData =({restData}) => {
        if(restData){
            return restData.map((item) => {
                return (
                    <div className="card mb-3" id="customCard" key={item.id}>
                        <div className="row g-0 px-0">
                            <div className="col-sm-5 px-0">
                                <img src={item.restaurant_thumb} className="img-fluid rounded-start" alt={item.restaurant_name} style={{height: '100%',maxHeight:'245px'}}/>
                            </div>
                            <div className="col-sm-7 px-0">
                                <div className="card-body">
                                    <h5 className="card-title">{item.restaurant_name}</h5>
                                            <p className="card-text">{item.address}</p>
                                            <p className="card-text">Rating: {item.average_rating} star</p>
                                            <p className="card-text">Cost: Rs {item.cost}/2 person</p>
                                            <div>
                                                <span className="badge bg-warning text-dark">{item.mealTypes[0].mealtype_name}</span>
                                                &nbsp;<span className="badge bg-secondary">{item.mealTypes[1].mealtype_name}</span>
                                                &nbsp;<span className="badge rounded-pill bg-dark">{item.cuisines[0].cuisine_name}</span>
                                                &nbsp;<span className="badge rounded-pill bg-dark">{item.cuisines[1].cuisine_name}</span>
                                            </div>
                                            <div className="pt-2"><Link className="btn btn-outline-success" id="view-detail" to={`/details/${item.restaurant_id}`}>View Details</Link></div>
                                            
                                  
                                
                                </div>
                            </div>
                        </div>
                    </div>
                )}    
            )}else{
                return(
                    <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-secondary" style={{width:'5rem', height:'5rem'}} role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                    </div>
                )
            }
        }    
        return(
            <>
               {renderData(props)}
            </>
        )
}

export default ListingDisplay;