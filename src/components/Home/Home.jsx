import React from "react";
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import EPFO from './Image_Logo/EPFO.png';
import G2bharat from './Image_Logo/G2bharat.jpg';
import Azadi from './Image_Logo/Azadi.png'
import SatmeJayte from './Image_Logo/Satme_Jayte.png'

import CustomSlider from "./customSlider";

import EPF_Instagram from './Slider_Img/EPF_Instagram.png'
import EPF_Auth from './Slider_Img/EPF_Auth.jpg'
import EPF_Swachhata from './Slider_Img/EPF_Swachhata.png'
import EPF_Royal from './Slider_Img/EPF_Royal.png'
import EPF_Awareness from './Slider_Img/EPF_Awareness.png'

const images = [
  {
    imgURL: EPF_Instagram,
    imgAlt: "EPF Instagram Awareness"
  },
  {
    imgURL: EPF_Auth,
    imgAlt: "EPF Authentication System"
  },
  {
    imgURL: EPF_Swachhata,
    imgAlt: "EPF Swachhata Campaign"
  },
  {
    imgURL: EPF_Royal,
    imgAlt: "EPF Royal Benefits"
  },
  {
    imgURL: EPF_Awareness,
    imgAlt: "EPF General Awareness"
  }
];

const Home = () => {
  return (
    <div className="homepage">
      {/* Header and Navigation */}
      <header className="Home_header">
        <nav className="Home_navbar">
          <ul className="Home_nav-items">
            <li>HOME</li>
            <li>Service</li>
            <li>Register</li>
            <li>Help</li>
            <li>Contact Us</li>
          </ul>
          <div className="Home_nav-right">
            <button className="Home_theme-toggle">🌙</button>
            <div className="dropdown">
              <button className="Home_login-btn">Login</button>
              <div className="dropdown-content">
                <Link to='/employee'>Employee</Link>
                <Link to='/employeer'>Employeer</Link>
                <Link to='/Admin'>Admin</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Logos Section */}
      <div className="Home_logos">
        <img src={EPFO} alt="EPFO" className="Home_logo Home_epfo-logo" />
        <div className="Home_title-section">
          <h1>Employees' Provident Fund Organisation, India</h1>
          <h2>Ministry of Labour & Employment, Government of India</h2>
        </div>
        <div className="Home_right-logos">
          <img src={G2bharat} alt="Gov Logo 1" className="Home_logo Home_gov-logo" />
          <img src={Azadi} alt="Gov Logo 2" className="Home_logo Home_gov-logo" />
          <img src={SatmeJayte} alt="Gov Logo 3" className="Home_logo Home_gov-logo" />
        </div>
      </div>


      {/* Ticker Section */}
      <div className="scroll_container">
        <div className="Home_scrolling-text">
          <span className="Home_sentence1">Dear Pensioner, Now submit Digital Life Certificate (Jeevan Pramaan Patra) from comfort of sitting at home, using Facial Authentication Technology(FAT)
          </span>
          <span className="Home_sentence2"> "A new functionality on Unified Portal has been launched to facilitate members and Employers to submit Member profile updation requests online"  </span>
        </div>
      </div>

      <div className="Home_content">
        <div className="Home_slider">
          <CustomSlider>
            {images.map((image, index) => {
              return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
            })}
          </CustomSlider>
        </div>

        {/* About Us Section */}
        <div className="Home_about-us">
          <h2>About Us</h2>
          <ul>
            <li>
              EPFO ranks among the globe's premier Social Security Organizations,
              distinguished by its vast clientele and the magnitude of financial
              transactions it manages. At present, it maintains 29.88 crore accounts
              (<a href="#">Annual Report 2022-23</a>) pertaining to its members.
            </li>
            <li>
              The inception of the Employees' Provident Fund dates back to the
              enactment of the <a href="#">Employees' Provident Funds Ordinance</a>
              on November 15, 1951, which was subsequently replaced by the Employees'
              Provident Funds Act of 1952. This legislative journey began with the
              introduction of the <a href="#">Employees' Provident Funds Bill</a>
              in Parliament as Bill Number 15 of 1952, aimed at establishing provident
              funds for employees across factories and other establishments. Over time,
              this legislation evolved into the <a href="#">Employees' Provident
                Funds & Miscellaneous Provisions Act of 1952</a>, applicable nationwide
              in India.
            </li>
            <li>
              The administration of this Act and its associated schemes falls under
              the purview of a tripartite body known as the
              <a href="#">Central Board of Trustees (CBT)</a>, Employees' Provident
              Fund. The CBT comprises representatives from various sectors, including
              the government (both central and state), employers, and employees.
            </li>
            <li>
              The CBT administers three schemes – Employees' Provident Fund (EPF) Scheme
              1952, Employees' Pension Scheme (EPS) 1995, and Employees' Deposit Linked
              Insurance (EDLI) Scheme 1976 for the workforce engaged in the organized
              sector in India. The Board is assisted by the Employees' PF Organization
              (EPFO), covering 147 ...
            </li>
          </ul>
        </div>
      </div>
      {/* Footer */}
      <footer className="Home_footer">
        <p style={{ margin: 0 }}>Footer Content</p>
        <p style={{ margin: 0 }}>@Copy write by PFS</p>
      </footer>
    </div>
  );
};

export default Home;
