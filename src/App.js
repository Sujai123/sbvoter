import React from 'react';
import './App.css';
import 'tachyons'
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/HomePage/HomePage'
import Createpoll from './components/Createpoll/Createpoll'
import VotePoll from './components/VotePoll/VotePoll';
import Checkresults from './components/Checkresults/Checkresults'
import Tree from './Treepic.png'

class App extends React.Component {
  constructor(){
    super()
    this.state={
      prev:"",
      next:"",
      route:"Home"
    }
  }

  clickPrev=()=>{
    this.setState({
      next:this.state.route,
      route:this.state.prev
    })
  }

  clickNext=()=>{
    this.setState({
      prev:this.state.route,
      route:this.state.next
    })
  }

  createpollrouteChange=()=>{
    this.setState({
      route:"Createpoll",
      prev:"Home"
    })
  }

  votepollrouteChange=()=>{
    this.setState({
      route:"Votepoll",
      prev:"Home"
    })
  }

  resultrouteChange=()=>{
    this.setState({
      route:"Result",
      prev:"Home"
    })
  }

  render(){
    let msg;
    if(this.state.route==="Home"){
      msg=<div>
        <HomePage
       createpollrouteChange={this.createpollrouteChange}
        votepollrouteChange={this.votepollrouteChange}
        resultrouteChange={this.resultrouteChange}
        /></div>
    }
    if(this.state.route==="Createpoll"){
      msg=<div><Createpoll /></div>
    }
    if(this.state.route==="Votepoll"){
      msg=<div><VotePoll /></div>
    }
    if(this.state.route==="Result"){
      msg=<div><Checkresults /></div>
    }
    return (
      <div>
        <img src={Tree} alt="Tree Background" />
      <div style={{"display":"flex","justifyContent":"center"}}>
        <div className="Homepage" style={{"textAlign":"center"}}>
        <p style={{"color":"#FBF1A9"}} className="h1">SB Voter</p>
        <div 
        className="bg-light-red" 
        style={{"padding":"30px","border":"2px solid purple","borderRadius":"20px","boxShadow":"5px 5px 10px black","marginTop":"50px"}} >
          <Navigation clickPrev={this.clickPrev} clickNext={this.clickNext} />
          {msg}
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
