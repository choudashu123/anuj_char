import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Gallery3.module.css";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger)

function Gallery3() {
  const sectionRef = useRef(null);

  return (
    // Ensure the container has a class that allows it to be seen
    <div className="gallery-wrapper" ref={sectionRef}>
      <Carousel fade indicators={true} controls={true} interval={1000}>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-1-min.JPG"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-2-min.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-3-min.JPG"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-4-min.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-5-min.JPG"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-6-min.JPG"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-7-min.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/home/carousel-8-min.JPG"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Gallery3;