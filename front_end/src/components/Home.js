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
import Payment from './Payment';
import Success from './Payment_Success';

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

        // Calling the end-user information using the fetch call
        fetch('https://api.github.com/user', {
            headers: {
                // Including the token to the Authorization header of fetch call
                Authorization: 'token ' + this.state.token
            }
        })
        // Parsing the response as JSON object
        .then(res => res.json())
        .then(res => {
            // Once response is received store it in state 
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
                        <NavbarBrand><Link to={'/home/'+this.state.token} style={{textDecoration:'none',color:'#fff'}}><MdSubway size='40px'/>{ } Loops' Train Reservation</Link></NavbarBrand>
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
                    <Route exact path='/home/:id/payment' component={Payment} />
                    <Route path='/home/:id/success' component={Success} />
                
                </div> 
                      
            </div>
            

            
        )
    }
}

export default Home;