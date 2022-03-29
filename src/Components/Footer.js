import React from 'react';
import '../Stylesheet/Footer.css'

const Footer = () => {
return(
    <footer id="footerData" className="container-fluid bg-dark">
        <div className="container">
            <div className="row">
                <div className="col-md-4 text-center">
                    
                    <p className="footer-socials mt-3">
                        <a href="#" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>&nbsp;
                        <a target="_blank" href="#"><i className="fab fa-twitter fa-2x"></i></a>&nbsp;
                        <a target="_blank" href="#"><i className="fab fa-facebook fa-2x"></i></a>
                    </p>
                </div>
                <div className="col-md-4 text-center flex-column d-flex justify-content-center align-items-center">
                    <p><small>©Foodiez 2021 All rights reserved</small></p>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <p style={{marginBottom: '0px'}}><i className="fas fa-headset fa-2x"></i> Contact Us: 91-9999988888</p>
                </div>
            </div>
        </div>
    </footer>
)}

export default Footer;