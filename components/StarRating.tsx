import React from 'react';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, animated } from '@react-spring/web';
import {motion} from "framer-motion";

function StarRating({ rating, index, delay }: { rating: number, index: number, delay: number }) {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);
  
  // create animation values
  const fullStarAnimations = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay: index * 100,
    config: { mass: 1, tension: 280, friction: 20 }
  });
  
  const partialStarAnimation = useSpring({
    from: { gradient: '#A9A9A9' },
    to: { gradient: '#6fda44' },
    config: { mass: 1, tension: 280, friction: 20 }
  });
  
  const emptyStarAnimations = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    delay: (fullStars * index + 1) ,
    config: { mass: 1, tension: 280, friction: 20 }
  });
  
  const starAnimations = [];

  // add colored full star animations
  for (let i = 0; i < fullStars; i++) {
    starAnimations.push(
      <animated.div key={i} style={{ transform: fullStarAnimations.scale.to(s => `scale(${s})`) }}>
        <FontAwesomeIcon icon={solidStar} color="#6fda44" />
      </animated.div>
    );
  }

  // add partial star animation
  if (partialStar > 0) {
    starAnimations.push(
      <animated.div key="partial" style={{ background: partialStarAnimation.gradient.to(g => `linear-gradient(to right, #FFD700 ${g}%, #A9A9A9 ${g}%`) }}>
        <FontAwesomeIcon icon={solidStar} color="#6fda44" />
      </animated.div>
    );
  }

  // add empty star animations
  for (let i = 0; i < emptyStars; i++) {
    starAnimations.push(
      <animated.div key={`empty-${i}`} style={{ transform: emptyStarAnimations.scale.to(s => `scale(${s})`) }}>
        <FontAwesomeIcon icon={emptyStar} color="#A9A9A9" />
      </animated.div>
    );
  }

  const updatedStarAnimations = starAnimations.map((star: JSX.Element, index: number) => {
    return (
      <motion.div
        key={index}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 1000, ease: "easeInOut", duration: 0.2, delay: delay + (index * 0.1)}}
      >
        {star}
      </motion.div>
    );
  });

  
  return (
    <div className="flex ">
      {updatedStarAnimations.map(star => star)}
    </div>
  );
}

export default StarRating;
