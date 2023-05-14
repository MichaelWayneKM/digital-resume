"use client";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import AppleWatchScroll from "@/components/AppleWatchScroll";
import ContactCard from "@/components/ContactCard";
import { ProjectFormProps } from "../../create/page";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/datafetching";
import { Breadcrumbs, Button, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "@/components/Spinner";

interface Screenshot {
  base64: string;
  name: string;
  path: string;
}

export interface ServerProjectFormProps extends ProjectFormProps {
  results: ProjectFormProps;
}

const ProjectPage = () => {
  const pathname = usePathname();
  const id = pathname.split("==")[1];

  const { data, isLoading } = useSWR<ServerProjectFormProps>(
    `/projects/${id}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const staleData = data?.results;

  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    console.log(selectedScreenshotIndex);
  }, [selectedScreenshotIndex]);

  const handleOpenPreview = (index: number) => {
    setSelectedScreenshotIndex(index);
  };

  const handleClosePreview = () => {
    setSelectedScreenshotIndex(null);
  };

  const handleNextScreenshot = () => {
    setSelectedScreenshotIndex((prevIndex) => (prevIndex as number) + 1);
  };

  const handlePreviousScreenshot = () => {
    setSelectedScreenshotIndex((prevIndex) => (prevIndex as number) - 1);
  };

  if (staleData == undefined && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full bg-[#f5f8ff] text-slate-900 min-h-screen">
        <p className="text-center text-gray-600 text-xl font-extrabold">
          <h2>Oops! No projects found.</h2>
        </p>
        <p className="text-lg">
          No projects found matching the ID. Please try my projects page
          instead.
        </p>

        <Link href={"/projects"} className="my-6 hover:text-blue-700 underline">
          Go to projects
        </Link>
      </div>
    );
  }

  if (staleData) {
    const endDate = new Date(staleData.projectDuration.endDate);
    const isValidEndDate = !isNaN(endDate.getTime());
    const isInProgress = isValidEndDate && endDate.getTime() > Date.now();

    return (
      <AppleWatchScroll>
        <nav className="bg-white shadow-sm">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between flex-wrap">
              <div className="flex">
                <div className="flex items-center">
                  <Image
                    src={staleData?.projectIcon?.base64 ?? "/favicon.ico"}
                    alt="Logo"
                    width={40}
                    height={40}
                  />
                  <span className="ml-2 font-semibold text-slate-900 text-lg">
                    {staleData.projectName}
                  </span>
                </div>
              </div>
              {staleData.githubUrl ? (
                <div className="flex items-center">
                  <a
                    href={`${staleData.githubUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4 py-5 text-slate-300 font-extrabold"
                  >
                    <span>View on Github </span>
                    <FontAwesomeIcon
                      icon={faGithub}
                      size="lg"
                      className="text-gray-600 hover:text-gray-800"
                    />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </nav>

        <div className="mx-5 md:mx-7 lg:mx-12 my-8 sm:text-sm">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              landing
            </Link>
            <Link color="inherit" href="/#projects">
              projects
            </Link>
            <Link color="inherit" href="/projects">
              All projects
            </Link>
            <Typography color="text.primary">
              Project {(staleData as any)["_id"]}
            </Typography>
          </Breadcrumbs>
        </div>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center md:flex-row justify-between">
              <div className="md:w-1/2 mb-8 mr-0 md:mr-10 lg:mr-10 md:mb-0 max-h-60 md:max-h-80 lg:max-h-96 overflow-clip flex items-center rounded-full">
                <Image
                  src={staleData.projectCover.base64}
                  alt={staleData.projectCover.name}
                  width={800}
                  height={500}
                  className="object-cover object-center"
                />
              </div>
              <div className="md:w-1/2">
                <h1 className="text-4xl font-bold mb-4 text-slate-950">
                  {staleData.projectName}
                </h1>
                <p className="text-lg mb-8 text-slate-800">
                  {staleData.projectDescription}
                </p>
                <ul className="list-disc pl-4 text-slate-800">
                  <li className="mb-2">
                    <span className="font-bold">Skills used:</span>{" "}
                    {staleData.projectSkills.join(", ").toString()}
                  </li>
                  <li className="items-center">
                    <span className="font-bold">Status:</span>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded-full border-2 text-sm font-medium 
        ${
          isInProgress
            ? "border-blue-500 text-blue-500"
            : "border-green-400 text-green-400"
        }`}
                    >
                      {isInProgress ? "In Progress" : "Completed"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-auto sm:px-6 lg:px-8 py-12">
            <div className="text-slate-950 px-4 font-extrabold text-4xl lg:text-6xl mt-10">
              Screenshots
            </div>

            <div className="flex px-4 overflow-x-auto">
              {staleData.screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.name}
                  onClick={() => handleOpenPreview(index)}
                  className="relative flex-shrink-0 w-64 h-48 mx-4 my-8 rounded-lg shadow-lg cursor-pointer"
                >
                  <Image
                    src={screenshot.base64}
                    alt={screenshot.name}
                    fill={true}
                    style={{
                      objectPosition: "center",
                      objectFit: "cover",
                    }}
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-slate-500 bg-opacity-50 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faSearchPlus}
                      className="text-white text-3xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div>
          {selectedScreenshotIndex != null && (
            <div className="fixed inset-0 z-50 overflow-y-auto pb-5 flex items-center justify-center backdrop-filter backdrop-blur-lg transition-opacity delay-1000 duration-1000 ease-in-out">
              <div className="absolute inset-0 bg-black opacity-75"></div>
              <div className="absolute text-white space-y-10 flex flex-col items-center">
                {selectedScreenshotIndex !== 0 && (
                  <button
                    className="text-white my-2 py-2 px-4 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
                    onClick={handlePreviousScreenshot}
                  >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                  </button>
                )}
                <Image
                  src={staleData.screenshots[selectedScreenshotIndex].base64}
                  alt={staleData.screenshots[selectedScreenshotIndex].name}
                  width={1200}
                  height={400}
                  className="object-contain md:object-scale-down lg:max-w-screen-xl md:lg:max-w-screen-md sm:lg:max-w-screen-sm max-h-[500px]"
                />
                {selectedScreenshotIndex < staleData.screenshots.length - 1 && (
                  <button
                    className="text-white my-2 py-2 px-4 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
                    onClick={handleNextScreenshot}
                  >
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </button>
                )}

                <Button
                  variant="outlined"
                  onClick={() => setTimeout(handleClosePreview, 800)}
                >
                  close preview
                </Button>
              </div>
            </div>
          )}
        </div>
        <ContactCard />
      </AppleWatchScroll>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f8ff] min-h-screen">
      <div className="animate-pulse flex flex-col items-center space-y-4 mb-10">
        <div className="h-6 w-40 bg-gray-400 rounded"></div>
        <div className="h-4 w-32 bg-gray-400 rounded"></div>
        <div className="h-4 w-64 bg-gray-400 rounded"></div>
        <div className="h-4 w-72 bg-gray-400 rounded"></div>
        <div className="h-4 w-56 bg-gray-400 rounded"></div>
      </div>
      <Spinner />
    </div>
  );
};

export default ProjectPage;
