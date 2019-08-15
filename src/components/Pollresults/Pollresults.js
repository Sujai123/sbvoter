import React,{Component} from 'react'
import './Pollresults.css'

class Pollresults extends Component{
    constructor(props){
        super(props)
        this.state={
            data:this.props.Polldetails
        }
    }

    dformat=(time)=>{
        let d = new Date(time)
        return d+""
    }


    render(){
        let status = ""
        let users = []
        let pollid = this.state.data._id
        let {username,pollname,participants,maxvotes,endtime,str} = this.state.data
        if(typeof(str)!="undefined"&&this.props.status===""){
            status = str
        }
        participants.sort((a,b)=>b.votes-a.votes)
        users = participants.map((user,i)=>{
            return <p key={i} className="participants"><span className="voteshandler"><b>#{i+1} :</b> {user.participant}</span> <b style={{"marginLeft":"10px"}}>Votes Received</b> : {user.votes}</p>
        })
        return(
            <div className="Pollresults">
                <p><b>{status}</b></p>
                <p><b>Poll id :</b> {pollid}</p>
                <p><b>Username :</b> {username}</p>
                <p><b>Pollname :</b> {pollname}</p>
                <p><b>Maximum votes allowed :</b> {maxvotes}</p>
                <p><b className="timeformat">Voting ends in :</b> {this.dformat(endtime)}</p>
                <p className="participants"><b>Standings : </b></p>
                {users}
            </div>
        )
    }
}

export default Pollresults