import React from 'react';
import './aboutUs.css';

const About = () =>{

    return (
        <div className="container-fluid">
            <div className="row About-banner">
                <div className="col-md-7">
                    <img className="about-img"src="Images/team2.jpg"></img>
                </div>
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                    <p id="quote">""After a slow start, Foodiez snowballed into an unstoppable force that is now changing the way India eats.""</p>
                </div>
            </div>
            <div className="row About-sec-banner">
                <div className="col-md-6 flex-column d-flex p-4 justify-content-center align-items-center">
                <p id="quote">We Are Foodiez | The Inside Scoop</p>
                <p>Want to know what's buzzing at the Foodiez side of the planet? There here is what you need to follow. We Are Foodiez channels on Social Media will give you an inside-out view of the everyday serious and fun stuff within our world. All you need to do is to click your preferred channel and make sure you follow us, Stay Tuned.</p>
                <p className="about-socials mt-3">
                        <a href="#" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>&nbsp;
                        <a target="_blank" href="#"><i className="fab fa-twitter fa-2x"></i></a>&nbsp;
                        <a target="_blank" href="#"><i className="fab fa-facebook fa-2x"></i></a>
                    </p>
                </div>
                <div className="col-md-6">
                    <img className="img-about-two"src="Images/team3.jpg"></img>
                </div>
            </div>
        </div>
    )
}

export default About;