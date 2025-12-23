import { useEffect, useRef } from "react";
import "./Gallery2.css"

const Gallery2 = () => {
  const sliderRef = useRef(null);
  const screenRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const getActiveSlide = () =>
    sliderRef.current.querySelector(".carousel__slide.active");

  const getFirstSlide = () => sliderRef.current.firstElementChild;
  const getLastSlide = () => sliderRef.current.lastElementChild;

  const getSiblingSlide = (slide, direction) =>
    direction === "prev"
      ? slide.previousElementSibling
      : slide.nextElementSibling;

  const getNewActiveSlide = (key, activeSlide) => {
    const actions = {
      Home: getFirstSlide,
      End: getLastSlide,
      ArrowLeft: () => getSiblingSlide(activeSlide, "prev"),
      ArrowRight: () => getSiblingSlide(activeSlide, "next"),
    };
    return actions[key]?.() || null;
  };

  const updateScreen = (activeSlide) => {
    const img = activeSlide.querySelector("img").cloneNode(true);
    screenRef.current.innerHTML = "";
    screenRef.current.appendChild(img);
  };

  const scrollToActiveSlide = (activeSlide) => {
    const { offsetLeft, offsetWidth } = activeSlide;
    const { clientWidth } = sliderRef.current;

    sliderRef.current.scrollTo({
      left: offsetLeft - clientWidth / 2 + offsetWidth / 2,
      behavior: "smooth",
    });
  };

  const updateButtonStates = (activeSlide) => {
    prevBtnRef.current.disabled = !getSiblingSlide(activeSlide, "prev");
    nextBtnRef.current.disabled = !getSiblingSlide(activeSlide, "next");
  };

  const updateCarousel = (activeSlide) => {
    sliderRef.current
      .querySelectorAll(".carousel__slide.active")
      .forEach((slide) => slide.classList.remove("active"));

    activeSlide.classList.add("active");
    updateScreen(activeSlide);
    scrollToActiveSlide(activeSlide);
    updateButtonStates(activeSlide);
  };

  const handleKeydown = (e) => {
    if (!e.target.closest(".carousel__slider")) return;

    const activeSlide = getActiveSlide();
    const newActiveSlide = getNewActiveSlide(e.key, activeSlide);

    if (newActiveSlide) {
      e.preventDefault();
      updateCarousel(newActiveSlide);
    }
  };

  const handleButtonClick = (direction) => {
    const activeSlide = getActiveSlide();
    const newActiveSlide = getSiblingSlide(activeSlide, direction);

    if (newActiveSlide) updateCarousel(newActiveSlide);
  };

  const handleCarouselClick = (e) => {
    const clickedSlide = e.target.closest(".carousel__slide");
    if (clickedSlide) updateCarousel(clickedSlide);
  };
  useEffect(() => {
    const sliderEl = sliderRef.current;

    if (!sliderEl) return;

    document.addEventListener("keydown", handleKeydown);
    sliderEl.addEventListener("click", handleCarouselClick);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      sliderEl.removeEventListener("click", handleCarouselClick);
    };
  }, []);


  return (
    <div className="image-thumbnail-carousel">
      <section className="image-display">
        <div className="screen" ref={screenRef}></div>
      </section>

      <section className="thumbnail-carousel">
        <button
          ref={prevBtnRef}
          className="carousel__btn prev"
          onClick={() => handleButtonClick("prev")}
          aria-label="Previous slide"
        >
          ◀
        </button>

        <ul className="carousel__slider" ref={sliderRef}>
          {[450, 452, 453, 454, 455, 456, 457, 458, 459].map((h, i) => (
            <li className="carousel__slide" key={i}>
              <div className="thumbnail">
                <img
                  loading="lazy"
                  src={`https://picsum.photos/800/${h}`}
                  alt=""
                />
              </div>
            </li>
          ))}
        </ul>

        <button
          ref={nextBtnRef}
          className="carousel__btn next"
          onClick={() => handleButtonClick("next")}
          aria-label="Next slide"
        >
          ▶
        </button>
      </section>
    </div>
  );
};

export default Gallery2;
