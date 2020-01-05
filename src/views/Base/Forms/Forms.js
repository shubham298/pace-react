import React, { Component } from 'react';
import Axios from 'axios';
import {Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';


class Forms extends Component {
  constructor(props) {
    super(props);
  }
  state={
    messages:'',
    user:''
  }
  addfield(){
    this.setState({fields:[...this.state.fields,'']})
  }
  
  handleChange =(e) =>{
    this.setState({
      [e.target.id]:e.target.value
    })
    console.log(this.state)
  }

  onsubmit(e){
    const body={
     messages:this.state.messages,
     user:this.state.user
  
    }
    console.log(this.state)
    if(this.state.user)
    {
      Axios.post('https://msg-pacepush.herokuapp.com/api/message', body).then(res=>{
        console.log(res);
        console.log(res.data)
      if(res.status===200)
      {
        alert("Notification Sent SuccessFully");
      }
      else
      {
        alert("Unable to sent Notification");
      }
      })
    }
    else
    {
      alert("Please Select user type")
    }
   

  }
  render() {
  

    return (
      <div className="animated fadeIn">
      <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Basic Form</strong> Elements
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Text Input</Label>
                    </Col>
                    <Col xs="8" md="8">
                      <Input type="text" id="messages" name="messages" onChange={this.handleChange} placeholder="message" />
                      <FormText color="muted">Enter your message here</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Audience</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="user" name="radios" value='1' onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="radio1">Active Users</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="user" name="radios" value='2' onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="radio2">Inactive Users</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="user" name="radios" value='3' onChange={this.handleChange} />
                        <Label check className="form-check-label" htmlFor="radio3">Banned Users</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={(e)=>this.onsubmit(e)}><i className="fa fa-dot-circle-o"></i> Send</Button>
              </CardFooter>
            </Card>
    
          </Col>
          </Row>
     
      
      </div>

      
    );
  }
}

export default Forms;
