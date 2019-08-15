import React from 'react'

class Error extends React.Component{
    render(){
        let msg
        if(typeof(this.props.message)!="undefined"){
            msg=<span>Please provide your total votes that is mentioned in your maximun votes</span>
        }
        else{
            msg=<span>Some error occured!!! Please try again with correct credentials!!!</span>
        }
        return(
            <div style={{"border":"2px solid black","borderRadius":"10px","backgroundColor":"#FBF1A9"}}>
                {msg}
                <button onClick={this.props.changeErrstatus} style={{"width":"30px","marginLeft":"20px","margin":"0"}} >X</button>
            </div>
        )
    }
}

export default Error;