import React,{Component} from 'react'
import './Created.css'

class Created extends Component{

    dformat=(time)=>{
        let d = new Date(time)
        return d+""
    }

    render(){
        let users
        let {pollid,username,pollname,participants,maxvotes,endtime}=this.props.Pollcreated
        if(typeof(participants)==="object"){
            users=participants.map((user,i)=>{
                return <p key={i} ><b>Participant #{i} :</b> {user.participant}</p>
            })
        }
        return(
            <div className="Created">
                <p><b>Poll Id :</b> {pollid}</p>
                <p><b>Created By :</b> {username}</p>
                <p><b>Poll Name :</b> {pollname}</p>
                <p><b>Maximum Votes One Can Apply :</b> {maxvotes}</p>
                <p><b className="timeformat">Voting Time will be ended by :</b> {this.dformat(endtime)}</p>
                {users}
            </div>
        )
    }
}

export default Created