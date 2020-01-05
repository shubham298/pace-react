import Axios from 'axios';
import React,{Component} from 'react';
import PickyDateTime from 'react-picky-date-time';
import { Form, Col} from 'react-bootstrap';
class Breadcrumbs extends Component {
  constructor(props) { 
    super(props);
    var d = new Date();
    
    this.state = {
      showPickyDateTime: true,
      date: d.getDate(),
      month: d.getMonth()+1,
      year: d.getFullYear(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds(),
      meridiem: 'AM',
      country:'',
      message:'',
      region:'',
      ccode:'',
      regions:[]
    };
  }
  handlemessage =(e) =>{
    console.log(e.target.value)
    this.setState({
      [e.target.id]:e.target.value
      
    })
  }
  
  handlenewChange(e){
    console.log(e.target.value)
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  
  onYearPicked(res) {
    const { year } = res;
    this.setState({ year: year});
    console.log(res.year)
  }

  onMonthPicked(res) {
    const { month, year } = res;
    this.setState({ year: year, month: month});
    console.log(res.month)
  }

  onDatePicked(res) {
    const { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
    console.log(date)
  }


  onsubmit(e){
    const body={
     year:this.state.year,
     month:this.state.month,
     date:this.state.date,
     message:this.state.message,
     country:this.state.country,
    hour:this.state.hour,
    minute:this.state.minute,
    second:this.state.second,
    meridiem:this.state.meridiem
    }
    var k=''
    k=body.year+'/'+body.month+'/'+body.date+' '+body.hour+':'+body.minute+' '+body.meridiem
    console.log(k)
    const body1={
      rdate:k,
      message:this.state.message,
      region:this.state.region,
      ccode:this.state.ccode
    }
    console.log(body1)
    Axios.post('https://msg-pacepush.herokuapp.com/api/time', body1).then(res=>{
          
          //console.log(res);
          console.log(res.data)
          var n=res.data.message;
          
          if(n==false){
            alert("message cannot be send! please maintain atleast 5 minutes gap.")
          }
    })
  }

  onResetDate(res) {
    const { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
  }

  onResetDefaultDate(res) {
    const { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
  }

  onSecondChange(res) {
    this.setState({ second: res.value });
  }

  onMinuteChange(res) {
    this.setState({ minute: res.value });
  }

  onHourChange(res) {
    this.setState({ hour: res.value });
  }

  onMeridiemChange(res) {
    console.log(res)
    this.setState({ meridiem: res});
  }

  onResetTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value
    });
  }

  onResetDefaultTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value
    });
  }

  onClearTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value
    });
  }

  // just toggle your outter component state to true or false to show or hide <PickyDateTime/>
  openPickyDateTime() {
    this.setState({showPickyDateTime: true});
  }

  onClose() {
    this.setState({showPickyDateTime: false});
  }
  componentDidMount() {
  
    fetch('https://msg-pacepush.herokuapp.com/api/countrydetails')
    .then(res=>res.json())
    .then(json=>{
        this.setState({
            regions:json,
            region:json[0].country,
            ccode:json[0].isocode
        })
        console.log(this.state)
      })
    
  }

  
  handlefieldChange(e){
    const region=e.target.value
    const region_country=region.slice(0, -3)
    var ccode = region.slice(-2);
    this.setState({region:region_country,ccode:ccode})  
    console.log(this.state.region)
    console.log(this.state.ccode)
   
  } 


  render() {
    const {
      showPickyDateTime,
      date,
      month,
      year,
      hour,
      minute,
      second,
      meridiem
    } = this.state;
    var {regions}=this.state
    return(
      <div>
<div align="center">
<PickyDateTime
  size="xs"
  mode={1}
  show={showPickyDateTime}
  locale="en-us"
  onClose={() => this.setState({ showPickyDateTime: false })}
  onYearPicked={res => this.onYearPicked(res)}
  onMonthPicked={res => this.onMonthPicked(res)}
  onDatePicked={res => this.onDatePicked(res)}
  onResetDate={res => this.onResetDate(res)}
  onSecondChange={res => this.onSecondChange(res)}
  onMinuteChange={res => this.onMinuteChange(res)}
  onHourChange={res => this.onHourChange(res)}
  onMeridiemChange={res => this.onMeridiemChange(res)}
  onResetTime={res => this.onResetTime(res)}
  onClearTime={res => this.onClearTime(res)}
/>
</div>
<div className="center">

<label htmlFor="entermessage">Enter the message:</label>
  <input type="text" className="form-control" rows="5" id="message" name="message" onChange={this.handlemessage}></input>
</div>





<div className="drop">
<div>
  <Form as={Col} controlId="formGridState">
  <br></br>
      <label>Region/Country(country code)</label>
      <select className="browser-default custom-select" name="field" onChange={(e)=>this.handlefieldChange(e)}>
  
          
              {regions.map(region=>(
                <option key={region.id}>{region.country}={region.isocode}</option>
                  
                      //Country:{region.region}|Code:{region.alpha2Code}
                  
              ))}
              </select>
    </Form>
    </div>
</div>



<div className="center">
<div className="Button">
<br></br>     
  <button onClick={(e)=>this.onsubmit(e)} type="button" className="btn btn-success">Submit</button>
  </div>
</div>

</div>
    );
  }
}
export default Breadcrumbs
