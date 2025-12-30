import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import gsap from "gsap";
import "swiper/css";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import "./ImageGallerySlider.css";
gsap.registerPlugin(ScrollTrigger);


const ImageGallerySlider = () => {

  const sectionRef = useRef(null)
  const trackRef = useRef(null)

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

    // Particles JS
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 180,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: { value: "#fff" },
        shape: { type: "circle" },
        opacity: {
          value: 0.3,
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
          },
        },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 0.4,
          direction: "right",
          random: true,
        },
      },
      retina_detect: true,
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
      ScrollTrigger.killAll()
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <section className="horizontal-section" ref={sectionRef}>
      <div className="horizontal-wrapper" ref={trackRef}>
        <div id="particles-js" className="particles"></div>

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

const slides = [
  {
    title: "Superman",
    image:
      "https://static.printler.com/cache/2/4/c/b/c/d/24cbcd37bd09944763de4a20e74a0954f6603bef.jpg",
  },
  {
    title: "Wonder Woman",
    image:
      "https://static.printler.com/cache/1/d/f/c/b/c/1dfcbcc2ad6b79aee980b7c8b62aa58d61f8e35f.jpg",
  },
  {
    title: "Batman",
    image:
      "https://static.printler.com/cache/d/e/f/c/2/0/defc20b88ceb44c0d60c4a4a28f01a00d242c46f.jpg",
  },
  {
    title: "Flash",
    image:
      "https://static.printler.com/cache/0/4/9/4/3/9/0494392a8e06037d523b66b0bf1f28fb23937e84.jpg",
  },
  {
    title: "Joker",
    image:
      "https://static.printler.com/cache/6/7/6/2/2/d/67622d0b766cb18a59e4ab785844ddc9a6853067.jpg",
  },
];

export default ImageGallerySlider;
