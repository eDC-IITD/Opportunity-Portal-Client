// import React from 'react';
// import StartUpImage from '../../assets/startup.png';
// import StudentImage from '../../assets/student.png';
// import { useNavigate } from 'react-router-dom';
import './style.css';
import Hero from './components/hero';
import FeaturesBlocks from './components/feature-blocks';
import Footer from './components/footer';
import Features from './components/features';
import Newsletter from './components/newsletter';
import Testimonials from './components/testimonials';
// import background from '../../assets/background.jpg';

export default function Landing({ BASE_URL, setShowAlert, setAlertMessage, setAlertSeverity }) {
  // const navigate = useNavigate();

  return (
    <div style={{overflowX : "hidden"}}>
      <Hero/>
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
      <Footer/>
    </div>
  );
}
