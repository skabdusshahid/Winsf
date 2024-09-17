import React, { useEffect, useState } from 'react';
import server1 from '../../assets/img/server-1.png'; // Adjust the path as necessary
import server2 from '../../assets/img/server-2.png'; // Adjust the path as necessary
import server3 from '../../assets/img/server-3.png'; 

import "bootstrap/dist/css/bootstrap.min.css"
import Http from '../Http';


const Service = () => {

  const [features, setFeatures] = useState([]);


  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(`${Http}/features`);
        if (response.ok) {
          const data = await response.json();
          setFeatures(data);
        } else {
          console.error('Failed to fetch features');
        }
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section id="Service" className="gap">
      {features && features.map((feature,index)=>{
        return <div key={index} className="container">
        <div className="heading two">
          <span>{feature.subTitle}</span>
          <h2>{feature.title}</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="server">
              <i><img alt="server" src={server1} /></i>
              <p><h5>{feature.cardTitle1}</h5></p>
              <p>{feature.cardDesc1}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="server two">
              <i><img alt="server" src={server2} /></i>
              <p><h5>{feature.cardTitle2}</h5></p>
              <p>{feature.cardDesc2}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="server three">
              <i><img alt="server" src={server3} /></i>
              <p><h5>{feature.cardTitle3}</h5></p>
              <p>{feature.cardDesc3}</p>
            </div>
          </div>
        </div>
        <div className="questions">
          <h5>Got questions? We’ve got answers. Send us an email to</h5>
          <a className="btn" href={feature.email}>{feature.email}</a>
        </div>
      </div>
      })}
      
    </section>
  );
}

export default Service;
