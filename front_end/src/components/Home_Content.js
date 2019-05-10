import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Collapse, 
    Button,
    Row,
    Col } from 'reactstrap';

import {IoMdCalendar} from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdStreetview } from "react-icons/md";

import Slide from './Slides'

class Home_Content extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { 
                collapse: false,
                token:props.match.params.id
            };
    }

    
    
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render(){
        return(
            <main role="main" >

                <section className=" text-center"  >
                    <br/>
                    <Slide />

                    <p className="card lead" style={{marginTop:'20px',padding:'20px'}}>
                    
                    <div>
                    <Button color="dark" onClick={this.toggle} ><MdStreetview size="20px"/></Button>
                        <Collapse isOpen={this.state.collapse}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8 col-md-7 py-4">
                                        <h4 className="text-white">About</h4>
                                        <p className="text-muted">There’s plenty of things to see and do around here- starting from the boat ride down the Mahaweli River, to Adam’s Peak, Horton Plains, Knuckles Mountain Range, Udawattakale Forest, Tea factories and plantations, a visit to the Brass Crafter, The Temple of Tooth Relic, to the city area that’s lined with gemstones shops. SriLanka is a rich mix of nature and culture.</p>
                                    </div>
                                    <div className="col-sm-4 offset-md-1 py-4">
                                        <h4 className="text-black">Contact</h4>
                                        <ul className="list-unstyled">
                                            <li><a href="#" className="text-black" style={{textDecoration:'none'}}><FaTwitter/> Follow on Twitter</a></li>
                                            <li><a href="#" className="text-black" style={{textDecoration:'none'}}><FaFacebook/> Like on Facebook</a></li>
                                            <li><a href="#" className="text-black" style={{textDecoration:'none'}}><FaInstagram/> Email me</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        </div>
                    <hr/>
                    <Row>
                        <Col xs="8">
                            There’s plenty of things to see and do around here- starting from the boat ride down the Mahaweli River, to Adam’s Peak, Horton Plains, Knuckles Mountain Range, Udawattakale Forest, Tea factories and plantations, a visit to the Brass Crafter, The Temple of Tooth Relic, to the city area that’s lined with gemstones shops. SriLanka is a rich mix of nature and culture.
                        </Col>
                        <Col xs="4" style={{display:'flex',alignItems:'center',paddingLeft:'15px'}}>
                            <Link to={'/home/'+this.state.token+'/booking'} className="btn btn-success "><IoMdCalendar size="50px" /> Make a Reservation</Link>
                        </Col>
                        
                        
                    </Row>
                    </p>
                    
                </section>

            </main>
        )
    }
}
export default Home_Content;