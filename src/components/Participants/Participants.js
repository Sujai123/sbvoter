import React,{Component} from 'react'

class Participants extends Component{

    constructor(){
        super()
        this.state={
            value:0,
            arr:[]
        }
    }

    nooftextbox=(event)=>{
        this.setState({
            value:event.target.value,
            arr:[]
        })
    }

    updateValues=(i,event)=>{
        let temp = this.state.arr
        temp[i]=event.target.value  
        this.setState({
            arr:temp
        },()=>{
            this.props.getParticipants(this.state.arr)
        })
    }

    render(){
        let items=[]
        for(let i=0;i<this.state.value;i++){
            items.push(<div key={i} >
                <p>Enter Participant #{i+1}(*) : </p>
                <input type="text" onChange={(e)=>this.updateValues(i,e)} />
            </div>)
        }
        return(
            <div>   
                <p>Enter the number of Participants(*) : </p>
                <input type="text" onChange={this.nooftextbox} />
                {items}
            </div>
        )
    }
}

export default Participants;