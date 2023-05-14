"use client";

import { useEffect } from 'react';
import "./applewatch.min.css";

export const AppleWatchScroll = ({ children }: {children: React.ReactElement[] | React.ReactElement }) => {
  useEffect(() => {
    const border = document.querySelector('.apple-watch-border') as HTMLDivElement;
    const content = document.querySelector('.apple-watch-content')!;

    content.addEventListener('scroll', () => {
      const scrollTop = content.scrollTop;
      const maxScroll = content.scrollHeight - content.clientHeight;
      const percentage = scrollTop / maxScroll;
      //border.style.transform = "translate3d(0, -" + scrollTop/3 + "px, 0) rotateZ(" + scrollTop/10 + "deg)";
    });

    return () => {
      content.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className="apple-watch bg-[#f5f8ff] min-h-screen pb-10">
      <div className="apple-watch-border">
        <div className="apple-watch-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppleWatchScroll;