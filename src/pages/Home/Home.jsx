
import workList from "../../data/workList";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import HeroImg from "/home/Hero_img2.jpg"

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import Reviews from "../../components/Reviews/Reviews";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import SubtleTrust from "../../components/SubtleTrust/SubtleTrust";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis, { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import Transition from "../../components/Transition/Transition";
import { ImGlass2 } from "react-icons/im";
import { FiArrowUpRight } from "react-icons/fi";
import Carousel from "../../components/Gallery2/Carousel";
import { cloudyNight } from "ionicons/icons";
import SplineDemo from "./Spline";
import ImageGallerySlider from "../../components/Carousel/ImageGallerySlider";
import ModernCarousel from "../../components/ModernCarousel/ModernCarousel";

const ScrollFix = () => {
  useLenis(({ isScrolling }) => {
    if (isScrolling) {
      document.body.classList.add("is-scrolling");
    } else {
      document.body.classList.remove("is-scrolling");
    }
  });
  return null;
};

const Home = () => {
  const workItems = Array.isArray(workList) ? workList : [];
  const stickyTitlesRef = useRef(null);
  const titlesRef = useRef([]);
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);
  const modelsWrapperRef = useRef(null)
  const micModelRef = useRef(null)
  const mic2ModelRef = useRef(null)
  const heroRef = useRef(null)
  const heroImgRef = useRef(null)

  useEffect(() => {
    if (!micModelRef.current) return;

    gsap.to(micModelRef.current, {
      rotation: "360deg",
      duration: 5,
      repeat: -1,
      ease: "linear"
    });
  }, []);

  useEffect(() => {
    // Array of your model IDs
    const modelIds = ["#mic_silver", "#play_button", "#testimonial_button"];

    const applySilverTexture = (event) => {
      const modelViewer = event.target;
      if (modelViewer.model && modelViewer.model.materials.length > 0) {
        modelViewer.model.materials.forEach((material) => {
          const pbr = material.pbrMetallicRoughness;
          pbr.setBaseColorFactor([0.75, 0.75, 0.75, 1]); // Grey Silver
          pbr.setMetallicFactor(1.0);                   // High Shine
          pbr.setRoughnessFactor(0.1);                  // Smooth surface
        });
      }
    };

    // Attach the listener to both models
    modelIds.forEach((id) => {
      const el = document.querySelector(id);
      if (el) {
        el.addEventListener("load", applySilverTexture);
      }
    });

    // Cleanup
    return () => {
      modelIds.forEach((id) => {
        const el = document.querySelector(id);
        if (el) el.removeEventListener("load", applySilverTexture);
      });
    };
  }, []);




  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const stickySection = stickyTitlesRef.current;
    const titles = titlesRef.current.filter(Boolean);

    if (!stickySection || titles.length !== 3) {
      window.removeEventListener("resize", handleResize);
      return;
    }



    gsap.set(titles[0], { opacity: 1, scale: 1 });
    gsap.set(titles[1], { opacity: 0, scale: 0.75 });
    gsap.set(titles[2], { opacity: 0, scale: 0.75 });

    const pinTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
    });



    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        scrub: 0.5,
      },
    });

    masterTimeline
      .to(
        titles[0],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        1
      )

      .to(
        titles[1],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        1.25
      );

    masterTimeline
      .to(
        titles[1],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        2.5
      )

      .to(
        titles[2],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        2.75
      );

    const workHeaderSection = stickyWorkHeaderRef.current;
    const homeWorkSection = homeWorkRef.current;

    let workHeaderPinTrigger;
    if (workHeaderSection && homeWorkSection) {
      workHeaderPinTrigger = ScrollTrigger.create({
        trigger: workHeaderSection,
        start: "top top",
        endTrigger: homeWorkSection,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    }

    return () => {
      pinTrigger.kill();
      if (workHeaderPinTrigger) {
        workHeaderPinTrigger.kill();
      }
      if (masterTimeline.scrollTrigger) {
        masterTimeline.scrollTrigger.kill();
      }
      masterTimeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);





  useEffect(() => {
    const workImgs = gsap.utils.toArray(".work-item-img");

    workImgs.forEach((img) => {
      gsap.fromTo(
        img,
        {
          scale: 0.7,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "top center",
            scrub: true,
            // markers: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [workItems]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ENTRY
      gsap.from(heroRef.current, {
        y: 500,
        opacity: 0,
        duration: 3,
        ease: "power4.out",
        delay: 0.2
      });


    });

    return () => ctx.revert();
  }, []);




  return (
    <ReactLenis root>
      <ScrollFix />
      <div className="page home">
        <section className="hero" ref={heroRef}>
          <div className="hero-img" ref={heroImgRef}>
            <img
              src={HeroImg}
            ></img>
          </div>
          <div className="hero-header">
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.7}>
              Anuj
            </AnimatedCopy>
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.8}>
              Char
            </AnimatedCopy>
          </div>
        </section>

        <section ref={stickyTitlesRef} className="sticky-titles">
          <div className="sticky-titles-nav">
            <p className="primary sm">About Me</p>
            <p className="primary sm">Let’s Connect</p>
          </div>
          <div className="sticky-titles-footer">
            <p className="primary sm">Captivating audiences, one moment at a time.</p>
            <p className="primary sm">Open to Collaborations</p>
          </div>

          <model-viewer
            className="mic1"
            id="mic_silver"
            src="https://my-3d-assets.pages.dev/mic-silver.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            auto-rotate
            rotation-per-second="30deg"
            orientation="0deg 20deg 0deg"
            shadow-intensity="1"
            shadow-softness="0.9"
          ></model-viewer>
          <h2 ref={(el) => (titlesRef.current[0] = el)}>
            I craft moments that captivate audiences with live energy and charisma.</h2>
          <h2 ref={(el) => (titlesRef.current[1] = el)}>
            Each event is driven by connection, spontaneity, and unforgettable presence.</h2>
          <h2 ref={(el) => (titlesRef.current[2] = el)}>
            This portfolio is a glimpse into the stages that ignite me.
          </h2>
        </section>



        <section ref={stickyWorkHeaderRef} className="sticky-work-header">
          {/* <AnimatedCopy tag="h1" animateOnScroll="true">
            <span>Char selects</span>
          </AnimatedCopy> */}
          <model-viewer
            className="mic1"
            id="play_button"
            src="https://my-3d-assets.pages.dev/play.fbx.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            auto-rotate
            rotation-per-second="30deg"
            orientation="0deg 20deg 0deg"
            shadow-intensity="1"
            shadow-softness="0.9"
          ></model-viewer>
        </section>

        <section ref={homeWorkRef} className="home-work">

          <div className="home-work-list">
            {workItems.map((work, index) => (
              <div
                key={work.id}
                className="home-work-item"
              >
                <p className="primary sm">{`${String(index + 1).padStart(
                  2,
                  "0"
                )} - ${String(workItems.length).padStart(2, "0")}`}</p>
                <h3>{work.title}</h3>
                <div className="work-item-img">
                  <iframe
                    src={work.image}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <h4>{work.category}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* <Reviews /> */}
        <SubtleTrust />

        {/* <Carousel /> */}
        <ModernCarousel />

        <section className="hobbies">
          <div className="hobby">
            <Link to="/events" className="hobby-link">
              <AnimatedCopy tag="h4" animateOnScroll={true}>
                WEDDINGS
              </AnimatedCopy>
              <FiArrowUpRight className="hobby-icon" />
            </Link>
          </div>
          <div className="hobby">
            <Link to="/events" className="hobby-link">
              <AnimatedCopy tag="h4" animateOnScroll={true}>
                CORPORATE EVENTS
              </AnimatedCopy>
              <FiArrowUpRight className="hobby-icon" />
            </Link>
          </div>
          <div className="hobby">
            <Link to="/events" className="hobby-link">
              <AnimatedCopy tag="h4" animateOnScroll={true}>
                SOCIAL EVENTS
              </AnimatedCopy>
              <FiArrowUpRight className="hobby-icon" />
            </Link>
          </div>
          <div className="hobby">
            <Link to="/events" className="hobby-link">
              <AnimatedCopy tag="h4" animateOnScroll={true}>
                SPORTS EVENTS
              </AnimatedCopy>
              <FiArrowUpRight className="hobby-icon" />
            </Link>
          </div>
          <div className="hobby">
            <Link to="/events" className="hobby-link">
              <AnimatedCopy tag="h4" animateOnScroll={true}>
                SHOOTS
              </AnimatedCopy>
              <FiArrowUpRight className="hobby-icon" />
            </Link>
          </div>
          <div className="hobby">
            <Link to="/events" className="hobby-link">
              <AnimatedCopy tag="h4" animateOnScroll={true}>
                VOICE OVERS
              </AnimatedCopy>
              <FiArrowUpRight className="hobby-icon" />
            </Link>
          </div>
        </section>


        <ContactForm />
        <Footer />
      </div>
    </ReactLenis >
  );
};

export default Transition(Home);
