import React,{Component} from 'react';
import {Route,Link} from 'react-router-dom'
import { Collapse, 
        Nav,
        Navbar,
        NavbarBrand,
        NavbarToggler,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem} from 'reactstrap';


import { MdSubway } from "react-icons/md";

import logo from '../assets/img/NsLogo.jpg'
import '../assets/css/Home.css'
import '../assets/css/Parallax.css'

import Home_Content from './Home_Content';
import Reservation from './Reservation';

class Home extends Component{

    constructor(props) {
        super(props);
        
        this.userLogout = this.userLogout.bind(this);
        this.state = { 
                collapse: false,
                token:props.match.params.id,
                user:'' 
            };
    }

    componentDidMount(){
        // const token = this.props.match.params.id;

        // Call the user info API using the fetch browser library
        fetch('https://api.github.com/user', {
            headers: {
                // Include the token in the Authorization header
                Authorization: 'token ' + this.state.token
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


    userLogout(){
        this.setState({user:''});
        this.props.history.push('/')
    }
    

    render(){
        return (
            
            <div className="parallax">

                
                    <div className="container" >
                    <header>

                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand href="/"><MdSubway size='40px'/>{ } Loops' Train Reservation</NavbarBrand>
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
                    <Route exact path='/home/:id' component={Home_Content} />
                    <Route exact path='/home/:id/booking' component={Reservation} />
                    
                
                </div> 
                      
            </div>
            

            
        )
    }
}

export default Home;