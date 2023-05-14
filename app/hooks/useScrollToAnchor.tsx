const useScrollToAnchor = (offset: number = 70) => {
    return (targetAnchor: string) => {
      console.log("Вызван хук");
      if (!(typeof window === "undefined")) {
        const hash = targetAnchor;
        const startWithHashRegex = /^#\w+/g;
        
  
        if (!hash || !startWithHashRegex.test(hash)) {
          return;
        }

        const targetElement = document?.querySelector(`${hash}`);

        if (!targetElement) return;
  
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
  
        const scroll = () => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        };
  
        if (typeof window !== "undefined" && 'scrollBehavior' in document.documentElement.style) {
          // Use CSS scroll behavior if available
          document.documentElement.style.scrollBehavior = 'smooth';
          window.scrollTo({
            top: offsetPosition,
          });
          document.documentElement.style.scrollBehavior = 'auto';
        } else {
          // Otherwise, use requestAnimationFrame
          requestAnimationFrame(scroll);
        }
      }
    };
  };
  
  export default useScrollToAnchor;
  