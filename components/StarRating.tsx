import React from 'react';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, animated } from '@react-spring/web';


function FullStar({ i, index}: { i:number, index: number}) {

    const { scale } = useSpring({ from: { scale: 0 }, to: { scale: 1 }, delay: i * index * 100 });
    
    
    return (
        <animated.div key={i} style={{ transform: scale.interpolate(s => `scale(${s})`) }}>
        <FontAwesomeIcon icon={solidStar} color="#FFD700" />
      </animated.div>
    )
}

function PartialStar() {

    const { gradient } = useSpring({ from: { gradient: '#A9A9A9' }, to: { gradient: '#FFD700' } });

    return (
        <animated.div key="partial" style={{ background: gradient.interpolate(g => `linear-gradient(to right, #FFD700 ${g}%, #A9A9A9 ${g}%`) }}>
        <FontAwesomeIcon icon={solidStar} color="#FFD700" />
      </animated.div>
    )
}

function StarRating({ rating, index }: { rating: number, index: number }) {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);
  const starAnimations = [];

  const { scale } = useSpring({ from: { scale: 0 }, to: { scale: 1 }, delay: index * 100 });
    
  

  // add colored full star animations
  for (let i = 0; i < fullStars; i++) {
    starAnimations.push(
      <FullStar i={i} index={index} />
    );
  }

  // add partial star animation
  if (partialStar > 0) {

    starAnimations.push(
      <PartialStar />
    );
  }

  // add empty star animations
  for (let i = 0; i < emptyStars; i++) {
    starAnimations.push(
      <animated.div key={`empty-${i}`} style={{ transform: scale.interpolate(s => `scale(${s})`) }}>
        <FontAwesomeIcon icon={emptyStar} color="#A9A9A9" />
      </animated.div>
    );
  }

  return (
    <div className="flex ">
      {starAnimations.map(star => star)}
    </div>
  );
}

export default StarRating;