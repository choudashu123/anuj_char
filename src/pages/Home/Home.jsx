import workList from "../../data/workList";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import Reviews from "../../components/Reviews/Reviews";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import Transition from "../../components/Transition/Transition";
import { ImGlass2 } from "react-icons/im";
import Carousel from "../../components/Gallery2/Carousel";

const Home = () => {
  const workItems = Array.isArray(workList) ? workList : [];
  const stickyTitlesRef = useRef(null);
  const titlesRef = useRef([]);
  const stickyWorkHeaderRef = useRef(null);
  const homeWorkRef = useRef(null);

  useEffect(() => {
    // ... your existing GSAP code ...

    // Important: Refresh after a small timeout to ensure 
    // all DOM elements and sub-components (like Gallery) are rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      // ... your existing cleanup ...
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

  // useEffect(() => {
  //   const iframe = document.querySelector(".hero-img iframe");
  //   if (!iframe) return;

  //   function resizeVideo() {
  //     const container = document.querySelector(".hero-img");

  //     const containerWidth = container.offsetWidth;
  //     const containerHeight = container.offsetHeight;
  //     const containerRatio = containerWidth / containerHeight;

  //     const videoRatio = 16 / 9;

  //     if (containerRatio > videoRatio) {
  //       iframe.style.width = containerWidth + "px";
  //       iframe.style.height = containerWidth / videoRatio + "px";
  //     } else {
  //       iframe.style.height = containerHeight + "px";
  //       iframe.style.width = containerHeight * videoRatio + "px";
  //     }

  //     iframe.style.position = "absolute";
  //     iframe.style.top = "50%";
  //     iframe.style.left = "50%";
  //     iframe.style.transform = "translate(-50%, -50%)";
  //     iframe.style.pointerEvents = "none";
  //   }

  //   resizeVideo();
  //   window.addEventListener("resize", resizeVideo);

  //   return () => window.removeEventListener("resize", resizeVideo);
  // }, []);


  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero">
          <div className="hero-img">
            <img
              src="../../public/home/Hero_img2.jpg"
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
          <h2 ref={(el) => (titlesRef.current[0] = el)}>
            I craft moments that captivate audiences with live energy and charisma.</h2>
          <h2 ref={(el) => (titlesRef.current[1] = el)}>
            Each event is driven by connection, spontaneity, and unforgettable presence.</h2>
          <h2 ref={(el) => (titlesRef.current[2] = el)}>
            This portfolio is a glimpse into the stages that ignite me.
          </h2>
        </section>

        <section ref={stickyWorkHeaderRef} className="sticky-work-header">
          <AnimatedCopy tag="h1" animateOnScroll="true">
            Char selects
          </AnimatedCopy>
        </section>

        <section ref={homeWorkRef} className="home-work">
          <div className="home-work-list">
            {workItems.map((work, index) => (
              <Link
                to="/sample-project"
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
                    frameBorder="0" // Changed from frameborder
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" // Changed from referrerpolicy
                    allowFullScreen // Changed from allowfullscreen
                  />
                </div>
                <h4>{work.category}</h4>
              </Link>
            ))}
          </div>
        </section>

        <Reviews />
        <Carousel />

        <section className="hobbies">
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              WEDDINGS
            </AnimatedCopy>
          </div>
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              CORPORATE EVENTS
            </AnimatedCopy>
          </div>
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              SOCIAL EVENTS
            </AnimatedCopy>
          </div>
          <div className="hobby">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              SPORTS EVENTS
            </AnimatedCopy>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);
