import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import eventDetails from "../../data/eventDetails";
import EventCarousel from "./EventCarousel";

import Footer from "../../components/Footer/Footer";
import ReactLenis from "lenis/react";
import "./Event.css";
import Transition from "../../components/Transition/Transition";

const Event = () => {
    const { id } = useParams();
    const event = eventDetails[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!event) {
        return (
            <div className="event-not-found">
                <h1>Event Not Found</h1>
                <Link to="/" className="btn">Back Home</Link>
            </div>
        );
    }

    return (
        <ReactLenis root>
            <div className="event-page">
                <div className="event-hero">
                    <div className="event-hero-content">
                        <AnimatedCopy tag="h1">{event.title}</AnimatedCopy>
                        <AnimatedCopy tag="h2">{event.subtitle}</AnimatedCopy>
                    </div>
                </div>

                <div className="event-details">
                    <div className="event-description">
                        <p className="primary">{event.description}</p>
                    </div>

                    <div className="event-gallery-container" style={{ marginBottom: "4em" }}>
                        <EventCarousel images={event.images} />
                    </div>
                </div>


                <Footer />
            </div>
        </ReactLenis>
    );
};

export default Transition(Event);
