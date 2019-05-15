import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Alert ,Spinner} from 'reactstrap';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";

import logo from '../logo.svg'
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaSubway } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

import { FaCcMastercard } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";



class Reservation extends Component{

    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
        this.state = { 
            visible: false,
            pending: false,
            token:props.match.params.id,
            user:'',
            fullName:'',
            email:'',
            contactNum:'',
            trainService:'',
            trainClass:'',
            numTickets:'',
            totalPrice:'',
            scheduleDate:setHours(setMinutes(new Date(), 0), 8),
            scheduleTime:setHours(setMinutes(new Date(), 0), 8)

        };

        this.onFormSubmit= this.onFormSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.onDismiss = this.onDismiss.bind(this);
        this.newlyAdded = this.newlyAdded.bind(this);
        this.checkPending = this.checkPending.bind(this);
        this.checkTotal= this.checkTotal.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
    }

    componentDidMount(){
        
        fetch('https://api.github.com/user', {
            headers: {
                Authorization: 'token ' + this.state.token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({user:res.name});
            console.log(this.state.user)
        })

    }

    handleChangeDate(date) {
        this.setState({
          scheduleDate: date
        });
    }

    handleChangeTime(date) {
        this.setState({
          scheduleTime: date
        });
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    newlyAdded(){
        if(this.state.visible){
            return (
                <div>
                    <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
                        Staff details successfully added and a Confirmation mail has been sent!
                    </Alert>
                </div>
            );
        }
    }

    checkPending(){
        if(this.state.pending){

            return (
                <div className="col-md-8 py-5 border" >
                    <Spinner style={{ width: '10rem', height: '10rem',paddingTop:'50px'}} type="grow" color="warning" />
                </div>
            )

        }
        else{
            return(
                <div className="col-md-8 py-5 border">
                    <h4 className="pb-4">Train Reservation Form</h4>
                    <form id='staffForm' onSubmit={this.onFormSubmit}>
                        <div className="form-row">
                            <div className="input-group form-group col-md-6">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><MdPerson/></div>
                                </div>
                                <input 
                                    name="fullName" 
                                    placeholder="Full Name" 
                                    className="form-control" 
                                    type="text"
                                    onChange={this.onValueChange}
                                    value={this.state.user} readOnly/>
                            </div>
                            <div className="input-group form-group col-md-6">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><MdEmail/></div>
                                </div>
                                <input 
                                    name="email" 
                                    placeholder="Email"
                                    className="form-control"
                                    type="email"
                                    onChange={this.onValueChange}
                                    value={this.state.email} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group form-group col-md-6">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><MdPhone/></div>
                                </div>
                                <input 
                                    name="contactNum" 
                                    placeholder="Contact No." 
                                    className="form-control" 
                                    required="required" 
                                    type="tel" 
                                    onChange={this.onValueChange}
                                    value={this.state.contactNum}/>
                            </div>
                            <div className="input-group form-group col-md-6">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><FaSubway/></div>
                                </div>   
                                <select name="trainService" className="form-control" onChange={this.onValueChange}>
                                    <option selected>Choose the Train service ...</option>
                                    <option>Udarata</option>
                                    <option>Utara Devi</option>
                                    <option>Yal Devi</option>
                                    <option>Southern Express</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group form-group col-md-6">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><FaRegStar/></div>
                                </div>
                                <select name="trainClass" className=" form-control" onChange={this.onValueChange}>
                                    <option selected>Choose Train Class ...</option>
                                    <option>First Class</option>
                                    <option>Second Class</option>
                                    <option>Third Class</option>
                                </select>
                            </div>
                            <div className="input-group form-group col-md-6">
                                <div className=" input-group-prepend">
                                    <div className="input-group-text"><FaTicketAlt/></div>
                                </div>
                            <select name="numTickets" className=" form-control" onChange={this.onValueChange}>
                                <option selected>Choose Number of Tickets ...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                            </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group form-group col-md-6">
                                <div className=" input-group-prepend">
                                    <div className="input-group-text"><FaCalendarAlt/></div>
                                </div>
                                <DatePicker
                                    selected={this.state.scheduleDate}
                                    onChange={this.handleChangeDate}
                                    todayButton={"Today"}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    maxDate={addDays(new Date(), 5)}
                                    placeholderText="Select a date between today and 5 days in the future"
                                    className="form-control"
                                    style={{marginRight:'50px'}}
                                />
                            </div>
                            <div className="input-group form-group col-md-6">
                                <div className=" input-group-prepend">
                                    <div className="input-group-text"><FaClock/></div>
                                </div>
                                <DatePicker
                                    selected={this.state.scheduleTime}
                                    onChange={this.handleChangeTime}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={120}
                                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 20)}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div style={{margin:'5px'}}>
                            {/* <label style={{fontSize:'20px',color:'green'}}>Total Amount :</label> { } */}
                            <input 
                                style={{fontSize:'20px',color:'green',border:'dotted',textAlign:'center'}} 
                                placeholder='Total Amount' 
                                readOnly
                                value={'Rs '+parseFloat(Math.round(this.state.totalPrice * 100) / 100).toFixed(2)}/>
                        </div>
                        <div>
                            Payment support : { }<FaCcAmazonPay size='40px'style={{padding:'5px'}}/>
                            <FaCcApplePay size='40px'style={{padding:'5px'}}/>
                            <FaCcMastercard size='40px'style={{padding:'5px'}}/> 
                            <FaCcPaypal size='40px'style={{padding:'5px'}}/>
                            <FaCcVisa size='40px'style={{padding:'5px'}}/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <div className="form-group">
                                    <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
                                    <label className="form-check-label" >
                                        <small>By clicking Submit, you agree to our Terms & Conditions, Visitor Agreement and Privacy Policy.</small>
                                    </label>
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                        
                        <div className="form-row" style={{display:'flex',justifyContent:'center'}}>
                            <button type='submit' className="btn btn-danger">Proceed to Payment</button>
                        </div>

                    </form>
                </div>
                
                
            )
        }
    }

    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value
        },()=>{
            this.checkTotal()
        })

        // const c = e.target.name;
        // console.log(e.target.name)
        // setTimeout(()=>{
        //     console.log(this.state.c)
        // },1000)
        // this.checkTotal()
        
    }

    checkTotal(){

        if(this.state.trainClass!=='')
            console.log(this.state.trainClass)

        if(this.state.trainService!=='')
            console.log(this.state.trainService)
        
        if(this.state.numTickets!=='')
            console.log(this.state.numTickets)

        if(this.state.trainClass!=='' && this.state.trainService!=='' && this.state.numTickets!==''){

            let total=0.0;
            
            if(this.state.trainClass==='First Class'){
                console.log(true);
                switch(this.state.trainService){
                    case 'Udarata':total=1075.00 
                        break;
                    case 'Utara Devi': total=1150.00
                        break;
                    case 'Yal Devi': total=975.00
                        break;
                    case 'Southern Express': total=840.00
                        break;
                    default  : total=0.00
                }
                console.log(total)
            }
            else if(this.state.trainClass==='Second Class'){

                switch(this.state.trainService){
                    case 'Udarata': total=825.00
                        break;
                    case 'Utara Devi': total=945.00
                        break;
                    case 'Yal Devi': total=765.00
                        break;
                    case 'Southern Express': total=600.00
                        break;
                    default  : total=0.00
                    
                }

            }
            else if(this.state.trainClass==='Third Class'){

                switch(this.state.trainService){
                    case 'Udarata': total=650.00
                        break;
                    case 'Utara Devi': total=685.00
                        break;
                    case 'Yal Devi': total=615.00
                        break;
                    case 'Southern Express': total=400.00
                        break;
                    default  : total=0.00
                    
                }

            }
            else
                total=0.0; 

            // Manipulate with Number of seats
            switch(this.state.numTickets){
                case '1': total *=1;
                    break;
                case '2': total *=2;
                    break;
                case '3': total *=3;
                    break;
                case '4': total *=4;
                    break;
                case '5': total *=5;
                    break;
                case '6': total *=6;
                    break;
                case '7': total *=7;
                    break;
                case '8': total *=8;
                    break;
                case '9': total *=9;
                    break;
                default : total= 0.00;
            }

            console.log(total)
            this.setState({totalPrice:total})
        }

    }

    onFormSubmit(e){
        this.setState({pending:true})
        e.preventDefault();

        const token = this.state.token;
        const user = this.state.user;
        const fullName = this.state.fullName;
        const email = this.state.email;
        const contactNum = this.state.contactNum;
        const trainService = this.state.trainService;
        const trainClass = this.state.trainClass;
        const numTickets = this.state.numTickets;
        const totalPrice = this.state.totalPrice;
        const scheduleDate = this.state.scheduleDate;
        const scheduleTime = this.state.scheduleTime;
        
        // console.log(fullName,email,password,profession,contactNum,location,response)

        const Reservation={
            token,
            user,
            fullName,
            email,
            contactNum,
            trainService,
            trainClass,
            numTickets,
            totalPrice,
            scheduleDate,
            scheduleTime

        }

        //Setting up sessionStorage
        localStorage.setItem('reservation', JSON.stringify(Reservation));

        this.props.history.push('/home/'+token+'/payment')
        // axios.post('http://localhost:4000/staff/add',staff)
        //     .then(
        //         res=>{
        //             console.log(res.data)
        //             // document.getElementById('staffForm').reset()
        //             this.setState({
        //                 visible:true,
        //                 pending:false,
        //                 fullName:'',
        //                 email:'',
        //                 password:'',
        //                 profession:'',
        //                 contactNum:'',
        //                 location:'',
        //                 response:''});

        //         },
        //         err=>console.log(err)
        //     )

    }

    render(){
        return(
            <div className="container" style={{paddingTop:'20px'}}>
                
                {this.newlyAdded()}
                {/* <!--Body--> */}

                <main role="main" style={{marginTop:'10px'}}>

                    <section className="jumbotron text-center" >
                        <div className="container" style={{backgroundColor:'#f9fbe7',marginTop:'-30px',marginBottom:'-30px'}}>

                            <div className='row' >
                                <div className='col-md-4 bg-info text-white text-center'>
                                    <div className="card-body" >
                                        <img src={logo} />
                                        <h2 className="py-3">Registration</h2>
                                        <p>
                                            Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel.

                                        </p>
                                    </div>
                                </div>

                                {/* form section */}
                                {this.checkPending()}
                            </div>
                        </div>
                    
                    </section>
                </main>

            </div>
        );
    }
}

export default Reservation;