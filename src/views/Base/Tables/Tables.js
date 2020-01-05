import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import './card-style.css'
import Axios from 'axios';
import {FormGroup,Input,Label,Row,} from 'reactstrap';
var users='';
class Tables extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      festivals: {
        card:[{
            id:'',
            card_name:'',
            user_type:'',
            card_photo:'',
            card_message:'',
            
       }] }
      }
}
handleChange(e){
  users=e.target.value;
   console.log(users)
}

onsend(e){
   console.log(e.target.value)
   console.log(e.target.id)
   
   console.log(e.target.name)
    const body={
          card_name:e.target.name,
          user_type:users,
          card_photo:e.target.id,
          card_message:e.target.value,
          
    }
  Axios.post('https://msg-pacepush.herokuapp.com/api/template', body).then(res=>{
        
        console.log(res)
        
        
  })
}


  componentDidMount() {
  
    fetch('https://msg-pacepush.herokuapp.com/api/templatedetail/5d996a83fd9458212440b506')
    .then(res=>res.json())
    .then(json=>{
        this.setState({
          festivals:json,
            
            
        })
       //console.log()
      })
    
  }
render(){
  return (
    <div>
      <h2>Please select the type of Users:</h2><br/>
      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="user" name="radios" value='Active Users' onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="radio1">Active Users</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="user" name="radios" value='Inactive Users' onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="radio2">Inactive Users</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="user" name="radios" value='Banned Users' onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="radio3">Banned Users</Label>
                      </FormGroup>

<br/><br/>
<h2>Please select the card:</h2><br/>
    <MDBRow style={{padding:"5px"}}>
    {this.state.festivals.card.map((res,i)=>(
    <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid"  src={res.card_photo} />
        <MDBCardBody>
     
          <MDBCardTitle>{res.card_name}</MDBCardTitle> 
          <MDBCardText>
            {res.card_message}
            </MDBCardText>

          <button type="button" name={res.card_name} value={res.card_message} id={res.card_photo} class="btn btn-primary btn-rounded" onClick={(e)=>this.onsend(e)}>Send</button>
          
          </MDBCardBody>
      </MDBCard>
      ))}
         </MDBRow>
      </div>)
}
}
export default Tables;