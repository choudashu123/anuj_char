import React from "react";
import "./Gallery.css";

import Gallery3 from "../../components/Gallery2/Gallery3";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";

import Transition from "../../components/Transition/Transition";

const Gallery = () => {
    return (
        <ReactLenis root>
            <div className="page gallery">
                <Gallery3 />
                <ContactForm />
                <Footer />
            </div>
        </ReactLenis>
    );
};

export default Transition(Gallery);
