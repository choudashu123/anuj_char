import { useEffect, useState, useRef } from "react";
import "./Carousel.css";

const slides = [
  {
    id: 1,
    image: "/home/carousel-4-min.jpg",
    title: "Cricket Event with Harsha Bhogle",
    text: "This is the first slide"
  },
  {
    id: 2,
    image: "/home/carousel-2-min.jpg",
    title: "Flim Night Event with Mandira Bedi",
    text: "Flim Night Event with Mandira Bedi"
  },
  {
    id: 3,
    image: "/home/carousel-3-min.JPG",
    title: "The Times of India Business Award",
    text: "This is the third slide"
  },
  {
    id: 4,
    image: "/home/carousel-1-min.JPG",
    title: "Times Leader of Tommorrow Event",
    text: "This is the third slide"
  },
  {
    id: 5,
    image: "/home/carousel-5-min.JPG",
    title: "Qualcomm Event",
    text: "This is the third slide"
  },
  {
    id: 6,
    image: "/home/carousel-6-min.JPG",
    title: "Anchoring at Qualcomm Event",
    text: "This is the third slide"
  },
  {
    id: 7,
    image: "/home/carousel-7-min.jpg",
    title: "FliKart Edge Event",
    text: "This is the third slide"
  },
  {
    id: 8,
    image: "/home/carousel-8-min.JPG",
    title: "Times's Leaders of Tomorrow",
    text: "This is the third slide"
  }
];

export default function Carousel() {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [activeSlide, setActiveSlide] = useState(1);
  const [index, setIndex] = useState(slidesPerView);
  const [isAnimating, setIsAnimating] = useState(true);
  const trackRef = useRef(null);

  /* Responsive slides per view */
  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth <= 768;
      setSlidesPerView(isMobile ? 1 : 3);
      setActiveSlide(isMobile ? 0 : 1);
      setIndex(isMobile ? 1 : 3);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Clone slides */
  const clonedSlides = [
    ...slides.slice(-slidesPerView),
    ...slides,
    ...slides.slice(0, slidesPerView)
  ];

  const next = () => {
    setIsAnimating(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIsAnimating(true);
    setIndex((prev) => prev - 1);
  };

  /* Handle seamless looping */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = () => {
      if (index >= slides.length + slidesPerView) {
        setIsAnimating(false);
        setIndex(slidesPerView);
      }

      if (index < slidesPerView) {
        setIsAnimating(false);
        setIndex(slides.length + slidesPerView - 1);
      }
    };

    track.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      track.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [index, slidesPerView]);


  /* Autoplay */
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const translateX = index * (100 / slidesPerView);

  return (
    <div className="carousel-wrapper">
      <div
        ref={trackRef}
        className="carousel-track"
        style={{
          transform: `translateX(-${translateX}%)`,
          transition: isAnimating ? "transform 1s ease" : "none"
        }}
      >
        {clonedSlides.map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            className={`carousel-slide ${i === index + activeSlide ? "active" : ""
              }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <h3>{slide.title}</h3>
          </div>
        ))}
      </div>

      <button className="nav prev" onClick={prev}>‹</button>
      <button className="nav next" onClick={next}>›</button>
    </div>
  );
}