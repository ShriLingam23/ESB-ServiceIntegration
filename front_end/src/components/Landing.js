import React,{Component} from 'react';


import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdSubway } from "react-icons/md";

import Img from '../assets/img/bg.jpg';
import logo from '../assets/img/NsLogo.jpg';

class Landing extends Component{

    render(){

        return(
            <div className="App">
    
                <div className="overlay"><img src={Img} width='100%' /></div>
                
                <div className="masthead">
                    <div className="masthead-bg"></div>
                    <div className="container h-300">
                    <div className="row h-100">
                        <div className="col-12 my-auto">
                        <div className="masthead-content text-white py-5 py-md-0" style={{marginTop:'100px'}}>
                            <h1 className="mb-3">
                            
                            <MdSubway size='100px'/>
                            </h1>
                            <h1 className="mb-3">Train Reservations</h1>
                            
                            <p className="mb-5">We're working hard to Train mean of traveling in Sri Lanka. Our target launch date is
                            <strong> May 2019</strong>! Authenticate using the link below!</p>
                            <p>There’s plenty of things to see and do around here. <strong>SriLanka</strong> is a rich mix of nature and culture.</p>
                            <div className="input-group input-group-newsletter">
                            
                            <div className="input-group-append" style={{marginLeft:'75px'}}>
                                <a className="btn btn-secondary" href="http://github.com" target='_blank' style={{borderTopLeftRadius:'50%'}} >
                                <FaGithub size='100px' onClick='#'/>
                                </a>
                                <a 
                                    href="https://github.com/login/oauth/authorize?client_id=42c283f5dd440faa8fc5" 
                                    style={{textDecoration:'none',color:'#FFF',alignItems:'center',display:'flex'}}
                                    className="btn btn-secondary"
                                >
                                    Authenticate!
                                </a>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="social-icons">
                    <ul className="list-unstyled text-center mb-0">
                    <li className="list-unstyled-item">
                        <a href="http://instagram.com" target='_blank'>
                        <FaInstagram style={{marginBottom:'7px'}}/>
                        </a>
                    </li>
                    <li className="list-unstyled-item ">
                        <a href="http://fb.com" target='_blank'>
                        <FaFacebook style={{marginBottom:'7px'}} />
                        </a>
                    </li>
                    <li className="list-unstyled-item">
                        <a href="http://twitter.com" target='_blank'>
                        <FaTwitter style={{marginBottom:'7px'}}/>
                        </a>
                    </li>
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default Landing;