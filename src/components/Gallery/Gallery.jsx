import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);


  // SCROLL → SLIDE CONTROL
  // useEffect(() => {
  //   if (!swiperRef.current) return;

  //   const totalSlides = swiperRef.current.slides.length;

  //   const trigger = ScrollTrigger.create({
  //     trigger: ".container-gallery",
  //     start: "top top",
  //     end: `+=${totalSlides * 100}%`,
  //     pin: true,
  //     scrub: 1,
  //     markers: true,
  //     pinSpacing: true,
  //     onUpdate: (self) => {
  //       const index = Math.round(self.progress * (totalSlides - 1));
  //       swiperRef.current.slideTo(index);
  //     },
  //   });

  //   return () => {
  //     trigger.kill();
  //   };
  // }, []);

  return (
    <section className="gallery-section" ref={sectionRef}>

      {/* GALLERY */}
      <div className="container-gallery">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          grabCursor={false}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={10}
          speed={1000}
          initialSlide={0}
          allowTouchMove={true}
          mousewheel={true}
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </SwiperSlide>
          ))}
        </Swiper>
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

export default Gallery;
