
export function generateCoolQueryParams() {
  const queryParams = [];
  const adjectives = [
    "vendor",
    "quadratic",
    "synergistic",
    "polymorphic",
    "cybernetic",
    "recursive",
    "heuristic",
    "fractal",
    "metamorphic",
    "holistic",
  ];
  const nouns = [
    "algorithm",
    "matrix",
    "bytecode",
    "compiler",
    "kernel",
    "library",
    "syntax",
    "abstraction",
    "variable",
    "paradigm",
  ];

  for (let i = 0; i < 100; i++) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const value = Math.floor(Math.random() * 1000);
    queryParams.push(`${adjective}-${noun}=${value}`);
  }

  return queryParams.join("&");
}

export const skills = [
  { name: "JavaScript", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "Python", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "TypeScript", skillRating: 6, imgSrc: "", imgAlt: "" },
  { name: "React", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "Kotlin", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "C", skillRating: 4, imgSrc: "", imgAlt: "" },
  { name: "androidstudio", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "Android", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "xcode", skillRating: 5, imgSrc: "", imgAlt: "" },
  { name: "Arduino", skillRating: 2, imgSrc: "", imgAlt: "" },
  { name: "Dart", skillRating: 6, imgSrc: "", imgAlt: "" },
  { name: "Flutter", skillRating: 6, imgSrc: "", imgAlt: "" },
  { name: "Docker", skillRating: 5, imgSrc: "", imgAlt: "" },
];

