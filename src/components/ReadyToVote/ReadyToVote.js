import React from 'react'
import Error from '../Error/Error'
import './ReadyToVote.css'

class ReadyToVote extends React.Component{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.pollDetails,
            err:false,
            arr:new Array(this.props.pollDetails.participants.length).fill(0)
        }
    }

    dformat=(time)=>{
        let d = new Date(time)
        return d+""
    }

    changeUservotes=(i,event)=>{
        let temp = this.state.arr
        temp[i]=(Number)(event.target.value)
        this.setState({
            arr:temp
        })
    }

    submitDetails=()=>{
        let totalvotes = 0
        this.state.arr.map(value=>{
            totalvotes += (Number)(value)
            return 0
        })
        if(totalvotes===(Number)(this.state.obj.maxvotes)){
            let temp = this.state.obj
            let temparr = this.state.arr
            temp.participants.map((user,i)=>{
                user.votes=(Number)(temparr[i])
                return 0;
            })

            fetch("https://guarded-plains-75396.herokuapp.com/vote/votesubmit",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(this.state.obj)
            })
            .then(Response=>{
                alert("successfully updated")
                window.location.reload()
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

    render(){
        let msg
        if(this.state.error===true){
            msg=<div><b><Error changeErrstatus={this.changeErrstatus} message={"you must apply exactly maximum votes"} /></b></div>
        }
        let users
        let pollid = this.state.obj._id
        let {username,pollname,maxvotes,endtime} = this.state.obj
        if(typeof(this.state.obj.participants)==="object"){
            let temp = this.state.arr
            users=this.state.obj.participants.map((user,i)=>{
                return <div key={i} >
                    <span><p style={{"display":"inline"}}>Participant #{i} :</p> <b>{user.participant}</b></span>
                    <input type = "range" min="0" 
                    max={maxvotes} 
                    value={temp[i]} 
                    onInput={(event)=>this.changeUservotes(i,event)}
                    readOnly
                    className="slider"
                     />
                    <input type = "text" value={temp[i]}
                    onChange={(event)=>this.changeUservotes(i,event)}
                     />
                </div>
            })
        }
        return(
            <div className="ReadyToVote">
                {msg}
                <p><b>Poll id :</b> {pollid}</p>
                <p><b>Username :</b> {username}</p>
                <p><b>Pollname :</b> {pollname}</p>
                <p><b>Maximum votes allowed :</b> {maxvotes}</p>
                <p><b className="timeformat">Voting ends in :</b> {this.dformat(endtime)}</p>
                {users}
                <button onClick={this.submitDetails}>Click here to vote!!!</button>
            </div>
        )
    }
}

export default ReadyToVote;