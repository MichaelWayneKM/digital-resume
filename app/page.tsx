"use client";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Head from "next/head";
import AppleWatchScroll from "@/components/AppleWatchScroll";
import { motion, HTMLMotionProps } from "framer-motion";

import { useTrail, animated } from "@react-spring/web";
import { useRef, useState } from "react";
import { useGesture } from "react-use-gesture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightArrowLeft,
  faArrowTurnRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "@/components/StarRating";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

const skills = [
  { name: "JavaScript", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "Python", skillRating: 4, imgSrc: "", imgAlt: "" },
  { name: "React", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "TypeScript", skillRating: 6, imgSrc: "", imgAlt: "" },
  { name: "Kotlin", skillRating: 2, imgSrc: "", imgAlt: "" },
  { name: "C", skillRating: 4, imgSrc: "", imgAlt: "" },
  { name: "Android", skillRating: 3, imgSrc: "", imgAlt: "" },
  { name: "Arduino", skillRating: 2, imgSrc: "", imgAlt: "" },
  { name: "Dart", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "Flutter", skillRating: 5, imgSrc: "", imgAlt: "" },
];

skills
  .sort((A, B) => B.skillRating - A.skillRating)
  .forEach((skill) => {
    skill.imgSrc = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.name.toLowerCase()}/${skill.name.toLowerCase()}-original.svg`;
    skill.imgAlt = `${skill.name} logo`;
  });

const SkillList = () => {
  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(skills.length, {
    config,
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 5 },
  });

  return (
    <div className="flex items-center justify-center  sm:px-0 select-none">
      {trail.map(({ x, opacity }, index) => (
        <animated.div
          key={index}
          className="flex items-center justify-center py-8 p-2"
          style={{
            opacity,
            transform: x.to((x) => `translate3d(0,${x}px,0)`),
          }}
        >
          {/* <SocialButtons />
          <img
            src="https://scontent.fnbo16-1.fna.fbcdn.net/v/t39.30808-6/292216034_345906891039056_235517857317372509_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oyHJ1PyA-zYAX_nFtAQ&_nc_ht=scontent.fnbo16-1.fna&oh=00_AfA2gq_wrisnHGLuFVTYkEeTJFbUPrGAhMZkyDTAU2FYcQ&oe=645855DA"
            alt="My photo"
            className="w-40 h-40 object-cover rounded-full border-4 border-white"
          /> */}
          <animated.div
            className="mx-2 text-white"
            style={{
              opacity,
              transform: x
                .to([0, 0.5, 1], [0, 20, 0])
                .to((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <StarRating
              rating={skills[index].skillRating}
              index={index}
              delay={2 + 0.4 * index}
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 1000,
                ease: "easeInOut",
                duration: 0.4,
                delay: 2 + 0.4 * index,
              }}
              draggable="false"
              className="mt-4 mb-2 w-20 h-30 mx-auto select-none object-cover rounded-full border-4 border-black bg-black overflow-clip"
            >
              <Image
                src={skills[index].imgSrc}
                alt={skills[index].imgAlt}
                height={80}
                loading="lazy"
                width={80}
              ></Image>
            </motion.div>
            <div className="text-slate-900 font-extrabold text-center">
              {skills[index].name}
            </div>
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
};

const SocialButton = ({ icon }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <animated.div
      className="rounded-full w-4 h-4 flex justify-center items-center mx-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "scale(1.1)" : "scale(1)",
        boxShadow: hovered
          ? "0px 0px 10px rgba(0,0,0,0.3)"
          : "0px 0px 5px rgba(0,0,0,0.2)",
      }}
    >
      <FontAwesomeIcon icon={faStar} className={`text-yellow-300 text-sm`} />
    </animated.div>
  );
};

const SocialButtons = () => {
  const icons = ["twitter", "linkedin", "github", "dribbble"];

  const trail = useTrail(icons.length, {
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  });

  return (
    <div className="flex justify-center">
      {trail.map(({ opacity, transform }, index) => (
        <animated.div
          key={icons[index]}
          style={{ opacity, transform }}
          className="relative"
        >
          <SocialButton icon={icons[index]} />
        </animated.div>
      ))}
    </div>
  );
};

const HeadingTile = () => {
  return (
    <div className="h-full">
      <div className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-4">
        <span className="block xl:inline">My </span>
        <span className="block xl:inline transform -skew-x-12">Digital </span>
        <span className="block xl:inline transform -skew-x-12">Portfolio </span>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <AppleWatchScroll>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="bg-gradient-to-b from-gray-800 to-blue-500 h-full"></div>
        </div>

        <div className="absolute  sm:right-2 md:right-10 lg:right-10">
          <Image
            src="/wkds-ui-mobile-sprite.png"
            alt="my mobile ui sprite"
            height={800}
            width={800}
            style={{
              opacity: 0.3,
              minHeight: 420,
              minWidth: 420,
            }}
          />
        </div>

        {/* All Heading components here */}
        <div className="relative z-10 py-40 px-4 md:px-8 lg:px-20">
          <HeadingTile />
        </div>
      </div>

      <div className="bg-white py-8 md:py-12 lg:py-16">
        <div className="skill-title relative tracking-tight font-extrabold z-20 mx-0 sm:mx-6 lg:mx-60 flex text-center text-slate-900 text-2xl rounded-full px-3 py-1">
          My skills and expertise
        </div>

        <div className="relative overflow-hidden flex  items-center align-middle min-w-full">
          <div className="absolute z-20 right-0 top-0 w-1/3 touch-none pointer-events-none bg-gradient-to-r from-transparent to-white h-full"></div>
          <div className="relative tech_stack mx-0 sm:mx-6 lg:mx-60 z-10 touch-auto flex items-center overflow-scroll overflow-y-scroll flex-nowrap">
            {/* <div className="mr-4 sm:mr-6 lg:mr-80"></div> */}

            <SkillList />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, top: 100 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, top: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
        className="relative bg-slate-900 py-8 md:py-12 lg:py-16"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.img
            initial={{ opacity: 0, marginBottom: 150 }}
            whileInView={{ opacity: 1, marginBottom: 16 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
            draggable="false"
            src="https://avatars.githubusercontent.com/u/74700061?s=400&v=4"
            alt="My photo"
            className="w-32 h-32 my-4 object-cover rounded-full border-2 border-white"
          />
          <motion.div
            initial={{ opacity: 0, marginBottom: 50 }}
            whileInView={{ opacity: 1, marginBottom: 16 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
            className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-4"
          >
            <span className="block xl:inline">Michael </span>
            <span className="block xl:inline transform -skew-x-12">Wayne</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, marginBottom: 50 }}
            whileInView={{ opacity: 1, marginBottom: 16 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
            className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4"
          >
            Software engineer
          </motion.div>
          <motion.div
            initial={{ opacity: 0, marginBottom: 50 }}
            whileInView={{ opacity: 1, marginBottom: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.6, ease: "easeInOut" }}
            className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl"
          >
            <p>
              Crafting scalable solutions through clean code and innovative
              problem-solving.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8 py-12 md:py-16 rounded-md bg-slate-50">
        <div className="text-5xl text-slate-900">Project History</div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/640x480.png?text=Project+1"
              alt="Project 1"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Project 1
              </h2>
              <p className="text-gray-600">A brief description of Project 1.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/640x480.png?text=Project+2"
              alt="Project 2"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Project 2
              </h2>
              <p className="text-gray-600">A brief description of Project 2.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/640x480.png?text=Project+3"
              alt="Project 3"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Project 3
              </h2>
              <p className="text-gray-600">A brief description of Project 3.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/640x480.png?text=Project+4"
              alt="Project 4"
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Project 4
              </h2>
              <p className="text-gray-600">A brief description of Project 4.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Me</h2>
          <p className="text-gray-600">
            Let's get in touch and talk about your next project.
          </p>
          <a
            href="#"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg"
          >
            Contact Me
          </a>
        </div>
      </div>
    </AppleWatchScroll>
  );
}
