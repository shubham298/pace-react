import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';
import Axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css"
let mess={}

class Delete_Segmenet extends Component{
 
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
          name:this.state.posts[props.index].name
         }
         Axios.post('https://msg-pacepush.herokuapp.com/api/deletesegment', body).then(res=>{
    console.log(res);
    console.log(res.data)
  })
alert("Segment deleted Successfully!")
       
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
        Header: "Action",
        width:400,
        maxWidth:400,
        minWidth:400,
        Cell: props=> {return(
         <form  onSubmit={(e)=> {this.handleSubmit(e,props)}}>
  <input type="submit" button style={{backgroundColor:"red",color:"#fefefe"}} value="delete"/>
</form>
 )

},
       
        width:100,
        maxWidth:100,
        minWidth:100
       
      }
  ]

    return(
         <div className="container">  
    <div className="card shadow">
        <div className="container">
            <h4 className=""></h4>
            <ReactTable
               columns={columns}
               data={this.state.posts}
              
               noDataText={"NO DATA..."}
               
               >

          </ReactTable>

          </div>
              </div>  
        </div>
    );
}
}

export default Delete_Segmenet;
