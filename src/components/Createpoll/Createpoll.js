import React,{Component} from 'react'
import Participants from '../Participants/Participants'
import Created from '../Created/Created'
import Error from '../Error/Error'
import './Createpoll.css'

class Createpoll extends Component{

    constructor(){
        super()
        this.state={
            username:"",
            pollname:"",
            participants:[],
            maxvotes:"",
            endtime:"",
            ack:{},
            route:"CreatePoll",
            error:false         
        }
    }

    updateusername=(event)=>{
        this.setState({
            username:event.target.value
        })
    }

    updatepollname=(event)=>{
        this.setState({
            pollname:event.target.value
        })
    }

    updateMaxVotes=(event)=>{
        this.setState({
            maxvotes:event.target.value
        })
    }

    updateEndtime=(event)=>{
        this.setState({
            endtime:event.target.value
        })
    }

    getParticipants=(items)=>{
        this.setState({
            participants:items
        })
    }

    getPollDetails=()=>{
        if(this.state.username.length>0&&
            this.state.pollname.length>0&&
            this.state.participants.length>0&&
            this.state.maxvotes.length>0&&
            this.state.endtime.length>0
            )
        {
            fetch('https://guarded-plains-75396.herokuapp.com/create',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username:this.state.username,
                    pollname:this.state.pollname,
                    participants:this.state.participants,
                    maxvotes:this.state.maxvotes,
                    endtime:this.state.endtime
                })
            })
            .then(response=>response.json())
            .then(data=>{
                this.setState({
                    route:'Created',
                    ack:data
                })
            })
            .catch(err=>{
                
                this.setState({
                    error:true
                })
            })
        }
        else{
            this.setState({
                error:true
            })
        }
    }

    changeErrstatus=()=>{
        this.setState({
            error:false
        })
    }

    keypresshandler=(event)=>{
        if(event.which===13){
            this.getPollDetails()
        }
    }

    
    render(){
        let msg,msg1
        if(this.state.error===true){
            msg1=<div><Error changeErrstatus={this.changeErrstatus} /></div>
        }
        if(this.state.route==="CreatePoll")
            msg=<div className="Createpoll">
                {msg1}
                <p>Enter Username(*) : </p>
                <input type="text" onChange={this.updateusername} autoFocus />
                <p>Enter the Poll name(*) : </p>
                <input type="text" onChange={this.updatepollname} />
                <Participants getParticipants={this.getParticipants} />
                <p>Enter how many votes one can apply(*) : </p>
                <div><input type="text" onChange={this.updateMaxVotes} /></div>
                <p>End After (in Minutes)(*) : </p>
                <div><input type="text" onChange={this.updateEndtime} onKeyPress={this.keypresshandler} /></div>
                <div><button onClick={this.getPollDetails}>Create a Poll!!!</button></div>
            </div>
        
        if(this.state.route==="Created")
            msg=<div>
                <Created Pollcreated={this.state.ack} />
                </div>
        

        return(
            <div style={{"display":"flex","justifyContent":"center","textAlign":"center"}}>
            {msg}
            </div>
        )
    }
}

export default Createpoll;