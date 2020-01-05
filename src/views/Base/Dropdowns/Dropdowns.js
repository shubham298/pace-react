import React, { Component } from 'react';
import axios from 'axios';

class viewdevices extends Component {

  constructor(props) {
    super(props);

    this.state = {
      devices: {
        total_count:'',
        offset:'',
        limit:'',
        players:[{
            id:'',
            identifier:''
       }] }
      }
  }

  componentDidMount() {
  
    fetch('https://msg-pacepush.herokuapp.com/api/viewdevices')
    .then(res=>res.json())
    .then(json=>{
        this.setState({
            devices:json,
            
        })
        console.log(this.state.devices)
      })
    
  }
  render() {
    return (
     <div>
       <h1 className="center">Device Details</h1>
       <h5>The number of users counts: {this.state.devices.total_count}</h5>
       <h5>Offset: {this.state.devices.offset}</h5>
       <h5>Limit: {this.state.devices.limit}</h5>
       
       {this.state.devices.players.map((region,i)=>(
          <div className="card">
          <div className="card-header"> 
          <h3>User {i} Details:</h3>
          </div>
          <div className="card-body">
          <tr><th>ID:</th>{region.id}</tr>
          <tr><th>Session Count:</th>{region.session_count}</tr>
          <tr><th>IP:</th>{region.ip}</tr>
          <tr><th>Device Type:</th>{ this.renderswitch(region.device_type)}</tr>
          <tr><th>Badge Count:</th>{region.badge_count}</tr>
          <tr><th>SDK:</th>{region.sdk}</tr>
          <tr><th>Device OS:</th>{region.device_os}</tr>
          <tr><th>Device Model:</th>{region.device_model}</tr>
          <tr><th>Last Active:</th>{region.last_active}</tr>
          <br></br>
          </div>
          </div>
       ))
       }
     </div>
    );
  }


renderswitch(param){
  switch(param){
    case 0:return 'iOS'
    case 1:return 'ANDROID'
    case 2:return 'AMAZON'
    case 3:return 'WINDOWSPHONE(MPNS)'
    case 4:return 'CHROME APPS/ EXTENSIONS'
    case 5:return 'CHROME WEB PUSH'
    case 6:return 'WINDOWS(WNS)'
    case 7:return 'SAFARI'
    case 8:return 'FIREFOX'
    case 9:return 'MACOS'
    case 10:return 'ALEXA'
    case 11:return 'EMAIL'
    
    
  }
}
}

export default viewdevices;