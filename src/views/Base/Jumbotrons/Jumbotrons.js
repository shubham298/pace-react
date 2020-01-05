import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Jumbotron, Row } from 'reactstrap';
import Axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css"
let mess={}


class Send_Segment extends Component{
 
  constructor(props){
      super(props);
    
      this.state ={
          posts: [],
          message:''
      }
      
  }

  componentDidMount(){
      const url ="https://msg-pacepush.herokuapp.com/api/viewsegment";
      fetch(url, {
       method: "GET"
      }).then(response => response.json()).then(posts => {
        this.setState({posts:posts})
      })
  }

  handleChange(e,props){
    mess[props.index]=e.target.value
  }

  handleSubmit(e,props){

      console.log(mess[props.index])
    
      console.log(this.state.posts[props.index].name)
      const body={
        messages:mess[props.index],
        name:this.state.posts[props.index].name
      
       }
       Axios.post('https://app-pacepush.herokuapp.com/api/messagesegment', body).then(res=>{
  console.log(res);
  console.log(res.data)
})

      e.preventDefault();
    }


render() {
const columns = [
    {
        Header: "Segment name",
        accessor:"name",

       
      width:200,
      maxWidth:200,
      minWidth:200
       
    },
    {
      Header: "Message",
      width:600,
      maxWidth:600,
      minWidth:600,
      Cell: props=> {return(
       <form  onSubmit={(e)=> {this.handleSubmit(e,props)}}>
<label>
 
  <input type="text" name="message" id="message"  onChange={(e)=> {this.handleChange(e,props)}}/>
</label>
<input type="submit" button style={{backgroundColor:"green",color:"#fefefe"}} value="Send"/>
</form>
)

},
     
      width:400,
      maxWidth:400,
      minWidth:400
     
    }
]

  return(
       <div className="container">  
  <div className="card shadow">
      <div className="container">
          <h4 className="">send segment</h4>
          <ReactTable
             columns={columns}
             data={this.state.posts}
            
             noDataText={"Please wait..."}
             
             >

        </ReactTable>

        </div>
            </div>  
      </div>
  );
}
}


export default Send_Segment;
