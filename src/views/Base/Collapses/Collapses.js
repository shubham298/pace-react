import React,{ Component } from 'react'
import './mess-cards.css'
import { Form , Col} from 'react-bootstrap';
import Axios from 'axios';
var i=0;
class Add_Segment extends Component{

  state={
  name:'',
  type:[{
  value:'',
  field:'',
  relation:'',
  operator:'and'
  }]
}





addfield(e){
  console.log(e)
  const value=e.target.value
  const [x] =['operator']
  
  this.setState(prevState => {
    const type = [...prevState.type];
    type[i-1] = { ...type[i-1], [x]: value };
    return { type };
  });
  console.log(value)
  console.log(this.state)
  console.log(i)
  //this.setState({type:[...this.state.type,'']})
  
i++;
  
}


handlenewChange(e,index){

  // this.setState({
  //   type[index] =[e.target.id]:e.target.value
  // })
  const value=e.target.value
  const [x] =['relation']
  
  this.setState(prevState => {
    const type = [...prevState.type];
    type[index] = { ...type[index], [x]: value };
    return { type };
  });
}

handlefieldChange(e,index){

  // this.setState({
  //   type[index] =[e.target.id]:e.target.value
  // })
  const value=e.target.value
  const [x] =['field']
  
  console.log(index)
  this.setState(prevState => {
    const type = [...prevState.type];
    type[index] = { ...type[index], [x]: value };
    return { type };
  });
}

handlenameChange(e){
  this.setState({
    [e.target.id]:e.target.value
  })
}


handleChange(e,index){
  const value=e.target.value
  const [x]  = [e.target.id]
  
  this.setState(prevState => {
    const type = [...prevState.type];
    type[index] = { ...type[index], [x]: value };
    return { type };
  });
  //console.log(this.state.type[index])
  // console.log(e.target.id)
  // console.log(e.target.value)
  // console.log(index)
   console.log(this.state)
}

handleRemove(index){
  this.state.type.splice(index,1)
  console.log(this.state.fields,"$$$$");
  this.setState({fields:this.state.fields})
}

onsubmit(e){
  const body={
    name:this.state.name,
    value:this.state.type.value,
    field:this.state.type.field,
    relation:this.state.type.relation
}
console.log(this.state)
 Axios.post('https://msg-pacepush.herokuapp.com/api/addSegment', this.state).then(res=>{
 console.log(res);
console.log(res.data)
 })


}


render(){
          
  return(
<div className="container">  
 
 <h1>Refer the table below and please fill in the details</h1>

<table class="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Relation</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Last_Session</td>
        <td>{">"} or {"<"} </td>
        <td>Here it is in terms of hours before or after last_session
          eg:1.1
        </td>
      </tr>
      <tr>
        <td>first_session</td>
        <td>{">"} or {"<"}</td>
        <td>Here it is in terms of hours before or after first_session
          eg:1.1</td>
      </tr>
      <tr>
        <td>session_count</td>
        <td>{">"} or {"<"} or = or !=</td>
        <td>Number sessions</td>
      </tr>
      <tr>
        <td>session_Time</td>
        <td>{">"} or {"<"}</td>
        <td>Tme in Seconds the user has been in your app ex:3600</td>
      </tr>
    
      <tr>
        <td>Tag</td>
        <td>{">"} or {"<"} or = or != or exists not_exists time_elapsed_gt time_elapsed_lt </td>
        <td>Tag value to compare. Not required for "exists" or "not_exists"</td>
      </tr>
    
      <tr>
        <td>Language</td>
        <td>!= or =</td>
        <td>Two character Language Code ex:"en"</td>
      </tr>

      <tr>
        <td>Email</td>
        <td>=</td>
        <td>email address</td>
      </tr>
    
      <tr>
        <td>Country</td>
        <td>=</td>
        <td>Two digit country Code </td>
      </tr>
   
    </tbody>
  </table>
<div className="card shadow">
    
     <span className="input-group-text" id="basic-addon1">Name of the Segment</span>
     <input className="inp-style" type="text" name="text" id="name"  onChange={(e)=>this.handlenameChange(e)}/>
     <div className="form-group ">  
     <h5 className="h5style">Segment data</h5>{
      
      this.state.type.map((key,index)=>{
           return(
             <div className="form-group">
           
            <div className="input-group">
            <div className="drop">
            


  <div key={index}>
  <Form as={Col} controlId="formGridState">
      <label>Field</label>
      <select as="select"  className="browser-default custom-select" name="field" onChange={(e)=>this.handlefieldChange(e,index)}>
        
        
      <option>---</option>
        <option>last_session</option>
        <option>first_session</option>
        <option>session_count</option>
        <option>session_time</option>
        <option>tag</option>
        <option>language</option>
        <option>email</option>
        <option>country</option>
      </select>
    </Form>
    </div>
</div>
</div>
<br></br>


<div className="drop">
<div key={index}>
  <Form as={Col} controlId="formGridState">
      <label>Relation</label>
      <select Control as="select" className="browser-default custom-select" onChange={(e)=>this.handlenewChange(e,index)}>
      <option>---</option>
        <option>></option>
        <option>{"<"}</option>
        <option>=</option>
        <option>!=</option>
        
        </select>
    </Form>
    </div>
</div>
<br></br>
<form className="form-inline">
            


            <div className="input-group">
             <div className="input-group-prepend">
             <div key={index}>
               <span className="input-group-text" id="basic-addon2">Value</span>
                   <input type="text" className="form-control" id="value" onChange={(e)=>this.handleChange(e,index)} placeholder=" enter the value" aria-label="Value" aria-describedby="basic-addon3"/>
             </div>
             </div>
            </div>
       </form>
<br></br>
      <div className="bt-style">
      <button onClick={(e)=>this.handleRemove(e)}>Remove</button>
</div>
                 </div>


             )
         })
    }   
    </div> 
<div className="center">
<div className="btn-group">
<div className="Button">     
<button onClick={(e)=>this.addfield(e)} value="and" type="button" className="btn btn-success">AND</button>
</div>
<div className="Button">     
<button onClick={(e)=>this.addfield(e)} value="or" type="button" className="btn btn-success">OR</button>
</div>
</div>
</div>





 </div>
<div className="center">
<div className="Button">     
<button onClick={(e)=>this.onsubmit(e)} type="button" className="btn btn-success">Submit</button>
</div>
</div>
</div>

 ) 
}

}
export default Add_Segment