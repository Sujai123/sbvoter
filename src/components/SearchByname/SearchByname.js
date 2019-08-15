import React from 'react'
import './SearchByname.css'

class SearchByname extends React.Component{

    dformat=(time)=>{
        let d = new Date(time)
        return d+""
    }


    render(){
        let list = this.props.listofpolls
        let polls
        if(list.length>0){
            polls = list.map((poll,i)=>{
                let participants = poll.participants.map((data,j)=>{
                    return <p key={j}><b>Participant #{j+1}</b> : {data.participant}</p>
                })
                return <div key={i} className="participants">
                    <div>
                        <p><b>Poll id : </b>{poll._id}</p>
                        <p><b>Username : </b>{poll.username}</p>
                        <p><b>Pollname : </b>{poll.pollname}</p>
                        <p><b>No of participants : </b>{participants.length}</p>
                        {participants}
                        <p><b>Maxvotes : </b>{poll.maxvotes}</p>
                        <p><b className="timeformat">Endtime : </b>{this.dformat(poll.endtime)}</p>
                    </div>
                    <div style={{"display":"flex","alignItems":"center","borderLeft":"1px solid black"}}>
                        <button 
                        onClick={()=>this.props.onepollHandler(poll.username,poll._id)}
                        style={{"margin":"0"}}>Click here!</button>
                    </div>
                </div>
            })
        }
        else{
            polls=<p><b>No record found</b></p>
        }
        return(
            <div>
                <p><b style={{"color":"purple"}}>List of Polls available : (Type someting in the name textbox)</b></p>
                <div className="SearchByname">
                    {polls}
                </div>
            </div>
        )
    }
}

export default SearchByname