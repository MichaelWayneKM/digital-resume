"use client";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import AppleWatchScroll from "@/components/AppleWatchScroll";
import ContactCard from "@/components/ContactCard";

export type Screenshot = {
  id: number;
  url: string;
  alt: string;
};

const ProjectPage = () => {
  const [selectedScreenshot, setSelectedScreenshot] =
    useState<Screenshot | null>(null);

  const screenshots: Screenshot[] = [
    {
      id: 1,
      url: "https://picsum.photos/800/500",
      alt: "Screenshot 1",
    },
    {
      id: 2,
      url: "https://picsum.photos/800/500",
      alt: "Screenshot 2",
    },
    {
      id: 3,
      url: "https://picsum.photos/800/500",
      alt: "Screenshot 3",
    },
  ];

  const handleScreenshotClick = (screenshot: Screenshot) => {
    setSelectedScreenshot(screenshot);
  };

  const handleClosePreview = () => {
    setSelectedScreenshot(null);
  };

  return (
    <AppleWatchScroll>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
                <span className="ml-2 font-semibold text-slate-900 text-lg">
                  My Awesome Project
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="https://github.com/my-username/my-awesome-project"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 text-slate-300 font-extrabold"
              >
                <span>View on Github </span>
                <FontAwesomeIcon
                  icon={faGithub}
                  size="lg"
                  className="text-gray-600 hover:text-gray-800"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center md:flex-row justify-between">
            <div className="md:w-1/2 mb-8 mr-0 md:mr-10 lg:mr-10 md:mb-0">
              <Image
                src={screenshots[0].url}
                alt={screenshots[0].alt}
                width={800}
                height={500}
                className="object-cover object-center rounded-full"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4 text-slate-950">
                My Awesome Project
              </h1>
              <p className="text-lg mb-8 text-slate-800">
                Our project aims to create a user-friendly and efficient online
                shopping platform for a wide range of customers. The platform
                will allow customers to browse through various products from
                different categories and purchase items with ease. In addition,
                the platform will provide a personalized shopping experience for
                users by offering recommendations based on their previous
                purchase history and preferences. The key features of the
                platform will include a simple and intuitive user interface,
                secure payment gateways, real-time inventory management, and
                advanced search and filter options. The platform will also
                leverage the latest technologies to ensure fast page load times
                and optimal performance. Our team is committed to delivering a
                high-quality product that meets the needs of both customers and
                businesses. We will work closely with our clients to understand
                their requirements and provide regular updates throughout the
                development process. Our goal is to deliver a platform that is
                scalable, robust, and reliable, while also being easy to use and
                visually appealing.
              </p>
              <ul className="list-disc pl-4 text-slate-800">
                <li className="mb-2">
                  <span className="font-bold">Skills used:</span> React,
                  Tailwind CSS, Next.js
                </li>
                <li>
                  <span className="font-bold">Status:</span> In progress
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto sm:px-6 lg:px-8 py-12">
          <div className="text-slate-950 px-4 font-extrabold">Screenshots</div>
          <div className="flex px-4 overflow-x-scroll">
            {[...screenshots, ...screenshots].map((screenshot) => (
              <Image
                key={screenshot.id}
                onClick={() => handleScreenshotClick(screenshot)}
                src={screenshot.url}
                alt={screenshot.alt}
                width={800}
                height={200}
                className="object-cover object-center cursor-pointer rounded-lg my-8 mr-12 "
              />
            ))}
          </div>
        </div>
      </main>
      <div>
        {selectedScreenshot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleClosePreview}
          >
            <div className="absolute inset-0 bg-black opacity-75"></div>
            <div className="absolute">
              <Image
                src={selectedScreenshot.url}
                alt={selectedScreenshot.alt}
                width={1200}
                height={800}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
      <ContactCard />
    </AppleWatchScroll>
  );
};

export default ProjectPage;
