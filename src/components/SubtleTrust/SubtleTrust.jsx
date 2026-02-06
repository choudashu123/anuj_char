import React, { useState, useEffect } from "react";
import celebrities from "../../data/celebrities";
import AnimatedCopy from "../AnimatedCopy/AnimatedCopy";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./SubtleTrust.css";

const SubtleTrust = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="subtle-trust-section">
            <div className="subtle-trust-header">
                <AnimatedCopy tag="h2">Shared Journeys</AnimatedCopy>
                <p>Moments of connection and energy, captured across diverse stages.</p>
            </div>

            {isMobile ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    className="trust-mobile-swiper"
                >
                    {celebrities.map((celeb) => (
                        <SwiperSlide key={celeb.id}>
                            <div className="subtle-trust-card">
                                <div className="image-container">
                                    <img src={celeb.image} alt="Collaborative Moment" />
                                    <div className="soft-overlay"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="subtle-trust-grid">
                    {celebrities.map((celeb) => (
                        <div key={celeb.id} className="subtle-trust-card">
                            <div className="image-container">
                                <img src={celeb.image} alt="Collaborative Moment" />
                                <div className="soft-overlay"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SubtleTrust;
