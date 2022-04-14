import { useEffect, useState, useRef } from 'react';
import { projectsList } from '../components/data';
import Head from 'next/head';
import IntroOverlay from '../components/introOverlay';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMail,
  AiOutlineWhatsApp,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home({ project }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const projectsRef = useRef(null);

  const completeAnimation = () => {
    setAnimationComplete(true);
    document.body.style.overflowY = 'auto';
  };

  const executeScroll = () => projectsRef.current.scrollIntoView();

  const scrollToProject = () => {
    if (typeof window !== 'undefined') {
      if (project) {
        // Use the hash to find the first element with that id
        const element = document.getElementById(project);

        if (element) {
          // Smooth scroll to that elment
          element.scrollIntoView();
        }
      }
    }
  };

  useEffect(() => {
    // Inner Page height for mobile devices
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // GSAP animation
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline();
    let projects = gsap.utils.toArray('.project');
    let mediaQuery = window.matchMedia('(min-width: 967px)');

    const homeAnimation = (animation) => {
      if (!project) {
        tl.to('.ball', {
          duration: 2,
          y: '100vh',
          ease: 'bounce.out',
        })
          .to('.ball', {
            duration: 1,
            scale: 30,
            ease: 'power3.out',
            onComplete: animation,
          })
          .from('.after-animation', {
            duration: 0.8,
            opacity: 0,
            ease: 'power3.out',
          })
          .from('.title', {
            duration: 0.5,
            y: 100,
            delay: 0.2,
            opacity: 0,
            ease: 'power3.out',
          })
          .from('.peep-image', {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
          })
          .from('.job-title', {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
          })
          .from('.scroll-indicator', {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
          });
      } else {
        completeAnimation();
        scrollToProject();
      }

      if (mediaQuery.matches) {
        projects.forEach((project) => {
          let tlProject = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: 'top center',
              end: 'center center',
              scrub: 1,
            },
          });
          let projectImage = project.querySelector('img');
          let projectInfo = project.querySelector('.project-info');

          tlProject
            .from(projectImage, {
              x: -300,
              opacity: 0,
            })
            .from(projectInfo, {
              x: 300,
              opacity: 0,
            });
        });
      } else {
        projects.forEach((project) => {
          let tlProject = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: 'top center',
              end: 'center center',
              scrub: 1,
            },
          });
          let projectImage = project.querySelector('img');
          let projectInfo = project.querySelector('.project-info');

          tlProject
            .from(projectImage, {
              y: 100,
              opacity: 0,
            })
            .from(projectInfo, {
              y: 100,
              opacity: 0,
            });
        });
      }

      let tlFooter = gsap.timeline({
        scrollTrigger: {
          trigger: 'footer',
          start: 'top center',
          end: 'top top',
          scrub: 1,
        },
      });

      tlFooter
        .from('footer h2', {
          y: 100,
          opacity: 0,
          duration: 0.6,
        })
        .from('footer .footer-links', {
          y: 100,
          opacity: 0,
          duration: 0.6,
        });
    };

    homeAnimation(completeAnimation);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Website for Ajiboye Adedotun, a backend developer studying Mechantronics Engineering at the Federal University of Technology Minna. Skilled with Node, MongoDB, Express.js, JavaScript, TypeScript, PostgreSQL, Python, AWS, Docker, Redis, Flask, and Git."
        ></meta>
        <meta property="og:url" content="https://youngprinnce.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:image" content="/ajiboye.png" />
        <title>Ajiboye Adedotun | Backend Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {animationComplete === false && <IntroOverlay />}
      <div className="after-animation">
        <header>
          <nav className="home-nav">
            <div className="space-between">
              <Link href="/">
                <div className="logo">_DevWurld</div>
              </Link>

              <ul className="nav-list">
                <li>
                  <motion.a
                    href="https://drive.google.com/file/d/1-5HDXZzo3l-eXb2iLXT85J080q_WmVft/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="View Ajiboye's Resume"
                  >
                    Resume
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="https://github.com/Youngprinnce"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Go to Ajiboye's GitHub"
                  >
                    <AiFillGithub size="2.2rem" />
                    <span className="header-hidden-text">GitHub</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="https://www.linkedin.com/in/ajiboye-adedotun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Connect with Ajiboye on LinkedIn"
                  >
                    <AiFillLinkedin size="2.2rem" />
                    <span className="header-hidden-text">LinkedIn</span>
                  </motion.a>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main className="main-home">
          <div className="cta">
            <h1 className="title">
              I <span className="playful"> Live </span> and{' '}
              <span className="playful"> Breathe </span> API's.
            </h1>
            <img
              src="/images/My_Peep.png"
              alt="My Peep"
              className="peep-image"
            />
          </div>

          <p className="job-title">
            <span className="text-reveal">
              Ajiboye Adedotun / Backend Developer
            </span>
          </p>
          <button className="scroll-indicator" onClick={executeScroll}>
            <span>Projects</span>
            <GoChevronDown size="1.3rem" />
          </button>
        </main>
        <div className="project-container" ref={projectsRef}>
          {projectsList.map(
            ({
              name,
              description,
              longDescription,
              image,
              mobileImage,
              link,
              project,
              GitHub,
              tools,
              index,
            }) => (
              <div className="project" key={index} id={project}>
                <Link href={link}>
                  <picture>
                    <source srcSet={image} media="(min-width: 1280px)" />
                    <img
                      className="project-image"
                      src={mobileImage}
                      alt={name}
                    />
                  </picture>
                </Link>
                <div className="project-info">
                  <Link href={link}>
                    <h2>{name}</h2>
                  </Link>
                  {description.split('\n').map((str, index) => (
                    <p key={index}>{str}</p>
                  ))}
                  {longDescription && (
                    <Link href={link}>
                      <button className="project-read-more">
                        <span>Read More</span>{' '}
                        <div className="read-more-arrow">
                          <GoChevronRight />
                        </div>
                      </button>
                    </Link>
                  )}
                  <h3>Tools used:</h3>
                  <ul className="tools-list">
                    {tools.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <motion.div className="project-btns">
                    <motion.a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={`Open site of ${name}`}
                      className="project-btn"
                    >
                      Open Site
                    </motion.a>
                    {GitHub && (
                      <motion.a
                        href={GitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={`View Code for ${name}`}
                        className="project-btn"
                      >
                        View Code
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            )
          )}
        </div>
        <footer>
          <h2>Connect with Me</h2>
          <ul className="footer-links">
            <li>
              <motion.a
                href="mailto:ajiboyeadedotun16@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Send me an email"
              >
                <AiFillMail size="2.2rem" />
              </motion.a>
            </li>
            <li>
              <motion.a
                href="https://github.com/Youngprinnce"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Go to Ajiboye's GitHub"
              >
                <AiFillGithub size="2.2rem" />
              </motion.a>
            </li>
            <li>
              <motion.a
                href="https://www.linkedin.com/in/ajiboye-adedotun/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Connect with Ajiboye on LinkedIn"
              >
                <AiFillLinkedin size="2.2rem" />
              </motion.a>
            </li>
            <li>
              <motion.a
                href="https://wa.me/+2348154267564"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Connect with Ajiboye on WhatsApp"
              >
                <AiOutlineWhatsApp size="2.2rem" />
              </motion.a>
            </li>
            <li>
              <motion.a
                href="https://twitter.com/_devwurld"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Follow Ajiboye on Twitter"
              >
                <AiOutlineTwitter size="2.2rem" />
              </motion.a>
            </li>
          </ul>
        </footer>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const project = query?.project ?? false;

  return {
    props: {
      project,
    }, // will be passed to the page component as props
  };
}
