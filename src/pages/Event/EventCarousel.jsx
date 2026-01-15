import React, { useState, useEffect } from "react";
import "./EventCarousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const EventCarousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Autoplay
    useEffect(() => {
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="event-carousel-container">
            <div className="event-carousel-track">
                {images.map((img, index) => {
                    // Calculate distance from active index
                    let offset = index - activeIndex;
                    if (offset < 0) offset += images.length; // Handle looping for logic if needed

                    // Simplified 3D logic: Determine class based on position relative to active
                    let className = "carousel-card";
                    if (index === activeIndex) {
                        className += " active";
                    } else if (
                        index === (activeIndex + 1) % images.length ||
                        (activeIndex === images.length - 1 && index === 0)
                    ) {
                        className += " next";
                    } else if (
                        index === (activeIndex - 1 + images.length) % images.length ||
                        (activeIndex === 0 && index === images.length - 1)
                    ) {
                        className += " prev";
                    } else {
                        className += " hidden";
                    }


                    return (
                        <div key={index} className={className} onClick={() => setActiveIndex(index)}>
                            <img src={img} alt={`Event slide ${index}`} />
                        </div>
                    );
                })}
            </div>

            <div className="carousel-controls">
                <button onClick={prevSlide} className="control-btn prev-btn">
                    <FaChevronLeft />
                </button>
                <button onClick={nextSlide} className="control-btn next-btn">
                    <FaChevronRight />
                </button>
            </div>

            <div className="carousel-indicators">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`indicator ${idx === activeIndex ? "active" : ""}`}
                        onClick={() => setActiveIndex(idx)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default EventCarousel;
