import React,{Component} from 'react';
import '../../Stylesheet/QuickSearch.css';
import QuickDisplay from './QuickDisplay';

const url = "https://foodiezdv.herokuapp.com/mealType";

class QuickSearch extends Component {
    constructor(props) {
        super(props)

        this.state={
            MealType:''
        }
    }
    render() {
    return(
        <div className="CardSection Container pb-2 px-5">
            <div className="CardSectionHeader pt-1 text-center mb-4">
                <span>Pick your category</span>
            </div>
            <QuickDisplay quickData={this.state.MealType}/>
        </div>
    );
    } 

componentDidMount(){
    fetch(url, {method:'GET'})
    .then((res) => res.json())
    .then((data) => {
        this.setState({MealType:data})
    })
}

}

export default QuickSearch;