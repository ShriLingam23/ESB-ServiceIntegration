import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Alert ,Spinner,Badge,} from 'reactstrap';

import logo from '../logo.svg'

import { FaCcMastercard } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";

import { FaCreditCard } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";



class Payment extends Component{

    constructor(props) {
        super(props);

        this.state = { 
            visible: false,
            pending: false,
            token:props.match.params.id,
            user:'',
            grossAmount:0.00,
            discount:0.00,
            netAmount:0.00,
            reservation:{},
            id:''
        };

        this.onFormSubmit= this.onFormSubmit.bind(this);
        this.onVerify = this.onVerify.bind(this);
        this.onIdChange = this.onIdChange.bind(this);

        this.onDismiss = this.onDismiss.bind(this);
        this.newlyAdded = this.newlyAdded.bind(this);
        this.checkPending = this.checkPending.bind(this);
        this.checkTotal= this.checkTotal.bind(this);
        
    }

    componentDidMount(){

        const reservation = JSON.parse(localStorage.getItem('reservation'));
        //console.log(reservation)
        this.setState({reservation:reservation})
        this.setState({grossAmount:reservation.totalPrice,netAmount:reservation.totalPrice})

        this.setState({user:reservation.user,token:reservation.token});

    }

    onDismiss() {
        this.setState({ visible: false });
    }

    newlyAdded(){
        if(this.state.visible){
            return (
                <div>
                    <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
                        Government Special Discount added to receipt!
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
                    {/* <h4 className="pb-4">Train Reservation Payment</h4> */}
                    <form id='staffForm' onSubmit={this.onFormSubmit}>
                        <div className="row">
                            <div className="col-sm-12" style={{marginBottom:'15px'}}>
                                <div className="card " style={{borderColor:'yellow'}}>
                                <div className="card-body">
                                    <h5 className="card-title"><Badge style={{fontSize:'10px'}} color="danger">Discount</Badge> For All Government Employees</h5>
                                    <p className="card-text">Enter your NIC Number to get 10% Dicount</p>
                                    <div className="input-group mb-3" style={{marginLeft:'170px'}}>
                                        <input 
                                            type="text" 
                                            placeholder="NIC Number" 
                                            style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderStyle:'inset',textAlign:'center'}}
                                            name='id'
                                            value={this.state.id}
                                            onChange={this.onIdChange}/>
                                        <div className="input-group-append">
                                            <button className="btn btn-info" type="button" onClick={this.onVerify}>Verify</button>
                                        </div>
                                    </div>

                                </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='row' style={{margin:'5px'}}>
                            <span className='col-md-2'></span>
                            <label className='col-4 text-left' style={{textAlign:'',fontSize:'18px'}}>Gross Amount :</label> { }
                            <input 
                                style={{fontSize:'20px',color:'green',border:'dotted',textAlign:'center'}} 
                                placeholder='Total Amount' 
                                readOnly
                                value={'Rs '+parseFloat(Math.round(this.state.grossAmount * 100) / 100).toFixed(2)}/>
                        </div>
                        <div className='row' style={{margin:'5px'}}>
                            <span className='col-md-2'></span>
                            <label className='col-md-4 text-left' style={{fontSize:'18px'}}>Discount :</label> { }
                            <input 
                                style={{fontSize:'20px',color:'green',border:'dotted',textAlign:'center'}} 
                                placeholder='Total Amount' 
                                readOnly
                                value={'Rs '+parseFloat(Math.round(this.state.discount * 100) / 100).toFixed(2)}/>
                        </div>
                        <div className='row' style={{margin:'5px'}}>
                            <span className='col-md-2'></span>
                            <label className='col-4 text-left' style={{fontSize:'18px'}}>Net Amount :</label> { }
                            <input 
                                style={{fontSize:'20px',color:'green',border:'dotted',textAlign:'center'}} 
                                placeholder='Total Amount' 
                                readOnly
                                value={'Rs '+parseFloat(Math.round(this.state.netAmount * 100) / 100).toFixed(2)}/>
                        </div>
                        <div style={{marginTop:'15px'}}>
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
                            <div className='col-4'><button type='submit' className="btn btn-danger"><FaMobileAlt size='25px'/> Payment via Mobile</button></div>
                            <div className='col-4'><button type='submit' className="btn btn-danger"><FaCreditCard size='25px'/> Payment via Card</button></div>
                        </div>

                    </form>
                </div>
                
                
            )
        }
    }

    onVerify(e){

        axios.post('http://localhost:4001/government/verify',{'id':this.state.id})
            .then(
                res =>{
                    if(this.state.discount===0.00){
                        if(res.data.valid){
                            this.setState({
                                discount:(this.state.netAmount*10/100),
                                visible:true
                            },()=>this.checkTotal())
                        }
                    }
                }
            )
        
        
    }

    onIdChange(e){
        this.setState({id:e.target.value});
    }

    checkTotal(){
        this.setState({
            netAmount:this.state.grossAmount-this.state.discount
        })

    }

    onFormSubmit(e){
        this.setState({pending:true})
        e.preventDefault();

        this.props.history.push('/home/'+this.state.token+'/success')

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

export default Payment;