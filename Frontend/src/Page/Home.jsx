import React from 'react';
import HomeLayout from '../Layout/HomeLayout';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import Expert from '../components/Expert';
import ExpertNxt from '../components/ExpertNxt';
import Service from '../components/Service';
import HowItWorks from '../components/HowItWorks';
import Faq from '../components/Faq';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/jquery.fancybox.min.css';
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'

const Home = () => {
  return (
    <HomeLayout>
      <section id="hero">
         <HeroSection />
      </section>
      <section id="about">
            <AboutSection />
      </section>

      <section id="expert">
            <Expert />
      </section>

      <section id="expertnxt">
            <ExpertNxt />
      </section>
      
      <section id="service">
            <Service />
      </section>

      <section id="howitworks">
            <HowItWorks />
      </section>

      <section id="testimonials">
            <Newsletter />
      </section>

      <section id="faq">
            <Faq />
      </section>

      <section id="testimonials">
            <Testimonials />
      </section>

      

    </HomeLayout>
  );
}

export default Home;
