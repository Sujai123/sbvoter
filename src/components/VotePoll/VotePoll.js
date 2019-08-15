import React,{ Component } from "react";
import ReadyTovote from '../ReadyToVote/ReadyToVote'
import Pollresults from '../Pollresults/Pollresults'
import SearchByname from '../SearchByname/SearchByname'
import Error from '../Error/Error'
import './VotePoll.css'

class VotePoll extends Component{
    constructor(){
        super()
        this.state={
            username:"",
            name:"",
            pollid:"",
            ack:{},
            route:"VotePoll",
            searchbynameresult:[],
            error:false,
            searchBynameroute:""
        }
    }

    updatename=(event)=>{
        this.setState({
            name:event.target.value
        })
    }

    updateUsername=(event)=>{
        this.setState({
            username:event.target.value
        })
    }

    updatePollid=(event)=>{
        this.setState({
            pollid:event.target.value
        })
    }

    submitDetails=()=>{
        if(this.state.username.length>0&&this.state.pollid.length>0){
            fetch('https://guarded-plains-75396.herokuapp.com/vote',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username:this.state.username,
                    pollid:this.state.pollid
                })
            })
            .then(response=>response.json())
            .then(data=>{
                if(typeof(data.str)=="undefined"){
                    this.setState({
                        ack:data,
                        route:"ReadyToVote"
                    })
                }else{
                    this.setState({
                        ack:data,
                        route:"Pollresults"
                    })
                }
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

    searchByname=()=>{
        this.setState({
            searchBynameroute:"searchbyname"
        })
        if(this.state.username.length>0&&this.state.name.length>0){
            fetch('https://guarded-plains-75396.herokuapp.com/searchbyname',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:this.state.name
                })
            })
            .then(response=>response.json())
            .then(data=>{
                this.setState({
                    searchbynameresult:data
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

    onepollHandler=(uname,id)=>{
        fetch('https://guarded-plains-75396.herokuapp.com/vote',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username:this.state.username,
                pollid:id
            })
        })
        .then(response=>response.json())
        .then(data=>{
            if(typeof(data.str)=="undefined"){
                this.setState({
                    ack:data,
                    route:"ReadyToVote"
                })
            }else{
                this.setState({
                    ack:data,
                    route:"Pollresults"
                })
            }
        })
        .catch(err=>{
            this.setState({
                error:true
            })
        })
    }

    changeErrstatus=()=>{
        this.setState({
            error:false
        })
    }

    updatenamekeyhandler=(event)=>{
        if(event.which===13){
            this.searchByname()
        }
    }

    updatepollidkeyhandler=(event)=>{
        if(event.which===13){
            this.submitDetails()
        }
    }


    render(){
        let msg2
        if(this.state.searchBynameroute==="searchbyname"){
            msg2=<div><SearchByname listofpolls={this.state.searchbynameresult} onepollHandler={this.onepollHandler} /></div>
        }
        let msg,msg1
        if(this.state.error===true){
            msg1=<div><Error changeErrstatus={this.changeErrstatus} /></div>
        }
        if(this.state.route==="VotePoll"){
            msg=<div>
                    {msg1}
                    <p>Enter Your name(*) : </p>
                    <input type="text" onChange={this.updateUsername} autoFocus />
                    <p>Enter Name(Search by name who created) : </p>
                    <input type="text" onChange={this.updatename} onKeyPress={this.updatenamekeyhandler} /><br />
                    <button onClick={this.searchByname}>Search by name Click to vote!!!</button>
                    <p>Enter Poll id (Enter a valid pollid or try searching for name) : </p>
                    <input type="text" onChange={this.updatePollid} onKeyPress={this.updatepollidkeyhandler} /><br />
                    <button onClick={this.submitDetails}>Click to vote!!!</button>
                    {msg2}
                </div>
        }
        if(this.state.route==="ReadyToVote"){
            msg=<div>{msg1}<ReadyTovote pollDetails={this.state.ack} /></div>
        }
        if(this.state.route === 'Pollresults'){
            msg = <div>{msg1}<Pollresults Polldetails={this.state.ack} status={""} /></div>
        }
        return(
            <div style={{"display":"flex","justifyContent":"center","textAlign":"center"}} className="VotePoll">
                {msg}
            </div>
        )
    }
}

export default VotePoll