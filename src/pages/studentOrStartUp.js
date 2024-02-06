import React from 'react';
import StartUpImage from '../assets/startup.png';
import StudentImage from '../assets/student.png';
import { useNavigate } from 'react-router-dom';
import '../pages/StudentORStartup.css';
import background from '../assets/background.jpg';

export default function StudentOrStartUp({ BASE_URL, setShowAlert, setAlertMessage, setAlertSeverity }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="conatiner">
        <div className="heading">.
          <span className="oppor">OPPORTUNITY</span>
          <span className="portal">PORTAL</span>
          <div className="welcome">
            <div>
              <p>Welcome to the </p>
            </div>
            <div>
              <p className="job">Job/Internship Portal </p>
            </div>
            <div>
              <p>of eDC IITD</p>
            </div>
          </div>
        </div>
        <div className="Container1">
          <div className="apply">
            <span>Apply to Top </span>
            <span className="startuptext">Startups </span>
            <span>with a single profile</span>
          </div>
          <div className="startuporstudent">
            <div className="you">
              <p>YOU ARE A</p>
            </div>
            <div>
              <img
                onClick={() => {
                  navigate('signUp', { state: { user: 'Student' } });
                }}
                src={StudentImage}
                alt="Student"
                className="student"
              />
            </div>
            <div className="or">
              <p>OR</p>
            </div>
            <div>
              <img
                onClick={() => {
                  navigate('signUp', { state: { user: 'Startup' } });
                }}
                src={StartUpImage}
                alt="StartUp"
                className="startup"
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
