import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./ModernCarousel.css";

const slides = [
    {
        id: 1,
        image: "/home/carousel-4-min.jpg",
        title: "Cricket Event with Harsha Bhogle",
    },
    {
        id: 2,
        image: "/home/carousel-2-min.jpg",
        title: "Flim Night Event with Mandira Bedi",
    },
    {
        id: 3,
        image: "/home/carousel-3-min.JPG",
        title: "The Times of India Business Award",
    },
    {
        id: 4,
        image: "/home/carousel-1-min.JPG",
        title: "Times Leader of Tommorrow Event",
    },
    {
        id: 5,
        image: "/home/carousel-5-min.JPG",
        title: "Qualcomm Event",
    },
    {
        id: 6,
        image: "/home/carousel-6-min.JPG",
        title: "Anchoring at Qualcomm Event",
    },
    {
        id: 7,
        image: "/home/carousel-7-min.jpg",
        title: "FliKart Edge Event",
    },
    {
        id: 8,
        image: "/home/carousel-8-min.JPG",
        title: "Times's Leaders of Tomorrow",
    }
];

const ModernCarousel = () => {
    return (
        <section className="modern-carousel-container">
            <div className="modern-carousel-header">
                <h2 className="modern-carousel-title">Moments Captured</h2>
                <div className="title-underline"></div>
            </div>

            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 15,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
                className="modern-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="modern-slide">
                        {({ isActive }) => (
                            <div className={`slide-content ${isActive ? 'modern-slide-active' : ''}`}>
                                <img src={slide.image} alt={slide.title} />
                                <div className="slide-overlay">
                                    <h3>{slide.title}</h3>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ModernCarousel;
