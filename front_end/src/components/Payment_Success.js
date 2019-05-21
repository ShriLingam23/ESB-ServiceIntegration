import React,{Component} from 'react';
import axios from 'axios';
import { Alert ,Spinner,Badge,} from 'reactstrap';

import logo from '../logo.svg'
import '../assets/css/Icon.css'


class Payment extends Component{

    constructor(props) {
        super(props);

        this.state = {
            pending: false,
            token:props.match.params.id,
            user:'',
            reservation:{}
        };

        this.onFormSubmit= this.onFormSubmit.bind(this);
        this.checkPending = this.checkPending.bind(this);
        this.checkTotal= this.checkTotal.bind(this);
        
    }

    componentDidMount(){

        const reservation = JSON.parse(localStorage.getItem('reservation'));
        //console.log(reservation)
        this.setState({user:reservation.user,reservation:reservation});

        //Sending email
        axios.post('http://192.168.1.100:8280/train/reserve/email/confirm',{'reservation':reservation})
            .then(
                (res)=>{
                    console.log(res.data); 
                }
            )
    

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
                    
                    <div style={{padding:'8px'}}>
                        <div className="row text-center">
                            <div >
                            <br/><br/> <h1 style={{color:'#0fad00'}}>Payment Successful !</h1>

                            <div className="swal2-icon swal2-success swal2-animate-success-icon" style={{display: 'flex'}}>
                                <div className="swal2-success-circular-line-left" style={{backgroundColor: '#f9fbe7'}}></div>
                                    <span className="swal2-success-line-tip"></span>
                                    <span className="swal2-success-line-long"></span>
                                    <div className="swal2-success-ring"></div> 
                                    <div className="swal2-success-fix" ></div>
                                <div className="swal2-success-circular-line-right" style={{backgroundColor: '#f9fbe7'}}></div>
                            </div>


                            <h3>Dear, {this.state.reservation.user}</h3>
                            <p style={{fontSize:'20px',color:'#5C5C5C'}}>
                                Thank you for booking at <b>Loops' Train Reservation</b>.We have sent you an email to "{this.state.reservation.email}" with your booking details.
                                Please go to your above email now and verify.
                            </p>
                            <a href="http://www.gmail.com" className="btn btn-success">     Log in      </a>
                            <br/><br/>
                            </div>
                            
                        </div>
                    </div>

                </div>
                
                
            )
        }
    }

    checkTotal(){
        this.setState({
            netAmount:this.state.grossAmount-this.state.discount
        })

    }

    onFormSubmit(e){
        this.setState({pending:true})
        e.preventDefault();



    }

    render(){
        return(
            <div className="container" style={{paddingTop:'20px'}}>

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