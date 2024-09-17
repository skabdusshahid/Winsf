import React, { useEffect, useState } from 'react';
// import $ from 'jquery';
import '../../assets/css/owl.carousel.min.css'
import '../../assets/css/owl.theme.default.min.css';
// import 'owl.carousel';

import step1 from '../../assets/img/shaps-1.png';
import step2 from '../../assets/img/shaps-2.png';
import step3 from '../../assets/img/shaps-3.png';
import customize from '../../assets/img/customize-2.png';
// import sponsor1 from '../../assets/img/sponsor-1.png';
// import sponsor2 from '../../assets/img/sponsor-2.png';
// import sponsor3 from '../../assets/img/sponsor-3.png';
// import sponsor4 from '../../assets/img/sponsor-4.png';
// import sponsor5 from '../../assets/img/sponsor-5.png';


import axios from 'axios';
import Http from '../Http';


const HowItWorks = () => {
  



  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetching data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Http}/consulting`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    // Ensure jQuery is loaded before Owl Carousel
    if (typeof $ !== 'undefined') {
      $('.owl-carousel').owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
      });
    }
  }, [data]);

  const getFileNameFromPath = (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  return (
    <section className="it-works no-top gap">



      {data.map((item) => (


        <div key={item._id} className="container">
          <div className="heading">
            <span>{item.subTitle}</span>
            <h2>{item.title}</h2>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="staps">
                <div className="staps-img">
                  <i><img alt="step 1" src={step1} /></i>
                  <span>1</span>
                </div>
                <div className="staps-text">
                  <h4>{item.cardTitle1}</h4>
                  <p>{item.cardDesc1}</p>
                </div>
              </div>
              <div className="staps">
                <div className="staps-img">
                  <i><img alt="step 2" src={step2} /></i>
                  <span>2</span>
                </div>
                <div className="staps-text">
                  <h4>{item.cardTitle2}</h4>
                  <p>{item.cardDesc2}</p>
                </div>
              </div>
              <div className="staps mb-lg-0">
                <div className="staps-img">
                  <i><img alt="step 3" src={step3} /></i>
                  <span>3</span>
                </div>
                <div className="staps-text">
                  <h4>{item.cardTitle2}</h4>
                  <p>{item.cardDesc3}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="customize-img">
                <img alt="customize" src={customize} />
              </div>
            </div>
          </div>

          <div className="logodata owl-carousel owl-theme">
            
          {item.sponsorImg && Array.isArray(item.sponsorImg) && item.sponsorImg.map((file, i) => (
            <div key={i} className="partner item">
            <img alt="sponsor 1" src={`${Http}/uploads/${getFileNameFromPath(file)}`} />
          </div>
          ))}
          </div>
        </div>

      ))}


    </section>
  );
}

export default HowItWorks;
