import React,{Component} from 'react'
import './HomePage.css'

class HomePage extends Component{
    render(){
        return(
            <div className="Homepagebuttons">
                <button onClick={this.props.createpollrouteChange} >Create a new Voting poll</button>
                <button onClick={this.props.votepollrouteChange}>Vote for an existing Poll</button>
                <button onClick={this.props.resultrouteChange}>Check Results!!!</button>
            </div>
        )
    }
}

export default HomePage;