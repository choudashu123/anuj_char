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
import { cloudyNight } from "ionicons/icons";
import SplineDemo from "./Spline";

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


  // useEffect(() => {
  //   if (mic2ModelRef.current) {
  //     // This manually pushes the speed into the 3D engine
  //     gsap.set(mic2ModelRef.current, {
  //       attr: { "rotation-speed": "14" }
  //     });
  //   }
  // }, []);


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
  //   const mic1DOM = document.querySelector(".mic1")
  //   const modelsWrapperRect = modelsWrapperRef.current.getBoundingClientRect()
  //   if (modelsWrapperRef.current) {
  //     if (modelsWrapperRect.bottom < window.innerHeight) {
  //       mic1DOM.style.position = "absolute"
  //       console.log("Hello")
  //     }
  //   }
  // }, [])

  useEffect(() => {
    // Select all the containers for the iframes
    const workImgs = gsap.utils.toArray(".work-item-img");

    workImgs.forEach((img) => {
      gsap.fromTo(
        img,
        {
          scale: 0.7, // Start smaller
          opacity: 0, // Optional: start faded out
        },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom", // Animation starts when the top of the img hits the bottom of the screen
            end: "top 30%",     // Animation ends when the top of the img reaches 20% from the top
            scrub: true,
          },
        }
      );
    });

    // Cleanup triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [workItems]); // Re-run if workItems change

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

      // EXIT (SMOOTH + CINEMATIC)
      // gsap.to(heroImgRef.current, {
      //   scrollTrigger: {
      //     trigger: heroRef.current,
      //     start: "top top",
      //     end: "center top", // 👈 controls smoothness
      //     scrub: true,     // 👈 smooth interpolation
      //     anticipatePin: 1,
      //     invalidateOnRefresh: true,
      //     markers: true, // enable only for debugging
      //   },
      //   rotationX: 16,
      //   rotationY: 26,
      //   xPercent: -5,
      //   x: 50,
      //   yPercent: 2,        // optional vertical correction        z: -120,
      //   scale: 1,
      //   ease: "power2.out",
      //   transformPerspective: 1200,
      // });

    });

    return () => ctx.revert();
  }, []);



  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero" ref={heroRef}>
          <div className="hero-img" ref={heroImgRef}>
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
          {/* <model-viewer
            className="mic1"
            src="./3d-models/ys_mic.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            auto-rotate
            rotation-per-second="30deg"
            orientation="0deg 20deg 0deg"
            shadow-intensity="1"
            shadow-softness="0.9"
          ></model-viewer> */}
          <model-viewer
            className="mic1"
            src="./3d-models/mic-silver.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            auto-rotate
            rotation-per-second="30deg"
            orientation="0deg 20deg 0deg"
            shadow-intensity="1"
            shadow-softness="0.9"
          ></model-viewer>
          {/* <model-viewer
            className="mic2"
            src="./3d-models/mic.glb"
            disable-zoom
            camera-orbit="0deg 90deg auto"
            rotation-per-second="30deg"
            orientation="0deg 0deg 180deg"

            interaction-prompt="none"
            auto-rotate
            shadow-intensity="1"
            shadow-softness="1"
          ></model-viewer> */}
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
          {/* <model-viewer
            className="stage"
            src="./3d-models/stage/scene.gltf"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            rotation-per-second="30deg"
            shadow-intensity="1"
            shadow-softness="0.9"
          ></model-viewer> */}
          {/* <model-viewer
            className="stage2"
            src="./3d-models/small_stage.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            rotation-per-second="30deg"
            shadow-intensity="1"
            shadow-softness="0.9"
            orientation="0deg 0deg -90deg"
          ></model-viewer> */}
          {/* <model-viewer
            className="stage3"
            src="./3d-models/softbox.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            rotation-per-second="30deg"
            shadow-intensity="1"
            shadow-softness="0.9"
            orientation="0deg 0deg -90deg"
          ></model-viewer>
          <model-viewer
            className="stage4"
            src="./3d-models/old_camera.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            rotation-per-second="30deg"
            shadow-intensity="1"
            shadow-softness="0.9"
            orientation="0deg 0deg -90deg"
          ></model-viewer>
          <model-viewer
            className="stage5"
            src="./3d-models/headphones.glb"
            camera-orbit="0deg 90deg auto"
            interaction-prompt="none"
            rotation-per-second="30deg"
            shadow-intensity="1"
            shadow-softness="0.9"
            orientation="0deg 0deg -90deg"
          ></model-viewer> */}
        </section>

        <section ref={homeWorkRef} className="home-work">
          <div className="models-wrapper" ref={modelsWrapperRef}>
            {/* <div className="mic">
              <model-viewer ref={micModelRef}
                src="./3d-models/ys_mic.glb"
                camera-controls
                camera-orbit="0deg 90deg auto"
                interaction-prompt="none"
              ></model-viewer>
            </div>
            <model-viewer ref={mic2ModelRef}
              src="./3d-models/mic.glb"
              camera-controls
              auto-rotate
              rotation-speed="14"
              // camera-orbit="0deg 90deg auto"
              interaction-prompt="none"
            ></model-viewer> */}
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
          </div>
        </section>
        {/* <SplineDemo /> */}
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
    </ReactLenis >
  );
};

export default Transition(Home);
