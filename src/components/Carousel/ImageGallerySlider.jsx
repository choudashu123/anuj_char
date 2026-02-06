import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import gsap from "gsap";
import "swiper/css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ImageGallerySlider.css";
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "/home/carousel-1-min.JPG",
    image: "/home/carousel-1-min.JPG",
  },
  {
    title: "/home/carousel-2-min.jpg",
    image: "/home/carousel-2-min.jpg",
  },
  {
    title: "/home/carousel-3-min.JPG",
    image: "/home/carousel-3-min.JPG",
  },
  {
    title: "/home/carousel-4-min.jpg",
    image: "/home/carousel-4-min.jpg",
  },
  {
    title: "/home/carousel-5-min.JPG",
    image: "/home/carousel-5-min.JPG",
  },
];

const ImageGallerySlider = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    new Swiper(".swiper", {
      grabCursor: true,
      initialSlide: 2,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 10,
      speed: 1000,
      freeMode: false,
      mousewheel: {
        thresholdDelta: 30,
      },
      on: {
        click(swiper) {
          swiper.slideTo(swiper.clickedIndex);
        },
      },
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    const section = sectionRef.current;
    const track = trackRef.current;

    const totalScrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(track, {
      x: -(totalScrollWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.killAll();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="horizontal-section" ref={sectionRef}>
      <div className="horizontal-wrapper" ref={trackRef}>
        <div className="container">
          <div className="swiper">
            <div className="swiper-wrapper">
              {slides.map((item, index) => (
                <div className="swiper-slide" key={index}>
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="MDJAminDiv">
          <a
            className="MDJAmin"
            href="https://github.com/MDJAmin"
            target="_blank"
            rel="noreferrer"
          >
            MDJAmin
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImageGallerySlider;
