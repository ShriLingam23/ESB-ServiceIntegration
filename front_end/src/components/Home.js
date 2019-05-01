import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Collapse, 
        Button,
        Nav,
        Navbar,
        NavbarBrand,
        NavbarToggler,
        NavItem,
        NavLink,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Row,
        Col } from 'reactstrap';

import {IoMdCalendar} from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdStreetview } from "react-icons/md";
import { MdSubway } from "react-icons/md";

import logo from '../assets/img/NsLogo.jpg'
import '../assets/css/Home.css'
import '../assets/css/Parallax.css'


import Slide from './Slides'

class Home extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.userLogout = this.userLogout.bind(this);
        this.state = { 
                collapse: false,
                user:'' 
            };
    }

    componentDidMount(){
        const token = this.props.match.params.id;

        // Call the user info API using the fetch browser library
        fetch('https://api.github.com/user', {
            headers: {
                // Include the token in the Authorization header
                Authorization: 'token ' + token
            }
        })
        // Parse the response as JSON
        .then(res => res.json())
        .then(res => {
            // Once we get the response (which has many fields)
            // Documented here: https://developer.github.com/v3/users/#get-the-authenticated-user
            this.setState({user:res.name});
            console.log(this.state.user)
        })

    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    userLogout(){
        this.setState({user:''});
        this.props.history.push('/')
    }
    

    render(){
        return (
            
            <div className="parallax">

                
                    <div className="container" style={{paddingTop:'20px'}}>
                    <header>

                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand href="/"><MdSubway size='50px'/>{ } Loops' Train Reservation</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                {this.state.user}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <button className='btn' onClick={this.userLogout} style={{color:'#000',border:'none'}}>Log Out</button>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            
                            
                            
                            </Nav>
                        </Collapse>
                        </Navbar>
                        
                    </header>


                    {/* <!--Body--> */}

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
                                    <a href="#" className="btn btn-success "><IoMdCalendar size="50px" /> Make a Reservation</a>
                                </Col>
                                
                                
                            </Row>
                            </p>
                            
                        </section>

                    </main>
                
                </div> 
                      
            </div>
            

            
        )
    }
}

export default Home;