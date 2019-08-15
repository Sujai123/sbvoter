import React,{Component} from 'react'
import './Navigation.css'

class Navigation extends Component{
    render(){
        return(
            <div style={{"display":"flex"}} className="Navigation" >
                <button onClick={this.props.clickPrev}>Previous Page</button>
                <button onClick={this.props.clickNext} style={{"marginLeft":"auto"}} >Next Page</button>
            </div>
        )
    }
}

export default Navigation;