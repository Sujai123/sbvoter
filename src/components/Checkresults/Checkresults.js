import React,{Component} from 'react'
import Pollresults from '../Pollresults/Pollresults'
import SearchByname from '../SearchByname/SearchByname'
import Error from '../Error/Error'
import "./Checkresults.css"

class Checkresults extends Component{
    constructor(){
        super()
        this.state={
            name:"",
            pollid:"",
            ack:{},
            route:"Checkresults",
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
        if(this.state.pollid.length>0){
            fetch('https://guarded-plains-75396.herokuapp.com/result',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username:this.state.username,
                    pollid:this.state.pollid
                })
            })
            .then(response=>response.json())
            .then(data=>{
                this.setState({
                    ack:data,
                    route:"Pollresults"
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

    searchByname=()=>{
        this.setState({
            searchBynameroute:"searchbyname"
        })
        if(this.state.name.length>0){
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
                username:uname,
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

    updatePollidkeyhandler=(event)=>{
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
        if(this.state.route==="Checkresults"){
            msg = <div>
                    {msg1}
                    <p>Enter Poll id (Enter a valid pollid or try searching for name) : </p>
                    <input type="text" onChange={this.updatePollid} onKeyPress={this.updatePollidkeyhandler} autoFocus /><br />
                    <button onClick={this.submitDetails}>Check Results!!!</button>
                    <p>Enter name(Search by name) : </p>
                    <input type="text" onChange={this.updatename} onKeyPress={this.updatenamekeyhandler} /><br />
                    <button onClick={this.searchByname}>Search by name Click to vote!!!</button>
                    {msg2}
                </div>
        }
        if(this.state.route === 'Pollresults'){
            msg = <div><Pollresults Polldetails={this.state.ack} status={"result"} /></div>
        }
        return(
            <div style={{"display":"flex","justifyContent":"center","textAlign":"center"}} className="Checkresults">
                {msg}
            </div>
        )
    }
}


export default Checkresults