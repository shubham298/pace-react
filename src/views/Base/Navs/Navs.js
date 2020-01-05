import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import axios from 'axios';

class history extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    axios.get('https://msg-pacepush.herokuapp.com/api/messagedetails').then(response => {
        this.setState({
          todos: response.data
        });
        console.log(response.data)
      })
  }

  render() {
    const { todos = [] } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="10">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                  <div class="row">
                <div class="col-lg-1 ">
                <th> Message</th></div>
                <div class="col-lg-2"></div>
                <th>Type</th>
                <div class="col-lg-3 "></div>
                <th>Time</th>
                  </div>
                  </tr>
                  </thead>
                  <tbody>
                   <tbody>
            {todos.length ? 
              todos.map(todo => (
                <tr>
                  <td>{todo.message}</td>
                
                  <td>{todo.segment}</td>
                  
                  <td>{todo.time}</td>
                </tr>
              ))
              : 
              (<tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                
              </tr>)
            }
            </tbody>
                  
                  
                 
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
          </Row>
          </div>
    )
  }
};

export default history