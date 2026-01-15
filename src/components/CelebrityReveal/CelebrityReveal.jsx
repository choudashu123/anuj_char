import React, { useState, useRef, useEffect } from "react";
import AnimatedCopy from "../AnimatedCopy/AnimatedCopy";
import celebrities from "../../data/celebrities";
import "./CelebrityReveal.css";

const CelebrityReveal = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const listRef = useRef(null);

    // Track mouse movement within the list to position the floating image
    const handleMouseMove = (e) => {
        if (listRef.current) {
            const rect = listRef.current.getBoundingClientRect();
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <section className="celebrity-reveal-section" ref={listRef} onMouseMove={handleMouseMove} onMouseLeave={() => setActiveIndex(-1)}>
            <div className="celebrity-header">
                <AnimatedCopy tag="h2">Celebrity Collaborations</AnimatedCopy>
                <p>Sharing the stage with the stars.</p>
            </div>

            <div className="celebrity-list">
                {celebrities.map((celeb, index) => (
                    <div
                        key={celeb.id}
                        className={`celebrity-item ${activeIndex === index ? "active" : ""}`}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        <div className="celebrity-info">
                            <span className="celebrity-name">{celeb.name}</span>
                            <span className="celebrity-event">{celeb.event}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Image Reveal */}
            <div
                className={`celebrity-image-reveal ${activeIndex !== -1 ? "visible" : ""}`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                }}
            >
                {celebrities.map((celeb, index) => (
                    <img
                        key={celeb.id}
                        src={celeb.image}
                        alt={celeb.name}
                        className={activeIndex === index ? "active" : ""}
                    />
                ))}
            </div>
        </section>
    );
};

export default CelebrityReveal;
