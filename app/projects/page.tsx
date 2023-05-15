"use client";

import useSWR from "swr";
import { ProjectFormProps } from "./create/page";
import { useState } from "react";
import { fetcher } from "@/utils/datafetching";
import AppleWatchScroll from "@/components/AppleWatchScroll";
import Image from "next/image";
import Link from "next/link";
import {
  faArrowLeft,
  faArrowLeftLong,
  faArrowRight,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";
import { Breadcrumbs, Skeleton, Typography } from "@mui/material";
import { generateCoolQueryParams } from "@/utils/cool";
import { Spinner } from "@/components/Spinner";
import {
  ProjectCard,
  ProjectCardSkeleton,
  ProjectFormCardProps,
} from "@/components/ProjectCard";

const PageHeader = () => {
  return (
    <div className="flex shadow-sm items-center px-4 py-8 mb-8 bg-white">
      {/* <div className="flex active:opacity-0 justify-center items-center rounded-full p-2 mr-10 hover:bg-slate-200">
        <FontAwesomeIcon icon={faArrowLeftLong} size={"2x"} />
      </div> */}
      {/* <FontAwesomeIcon className="mr-4" icon={faSuperpowers} size={"2x"} /> */}
      <h2 className="text-4xl font-bold text-gray-900">All Projects</h2>
    </div>
  );
};

const ProjectShimmer = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(9)].map((_, index) => (
      <ProjectCardSkeleton key={index}/>
    ))}
  </div>
);

const ProjectsComponent = () => {
  const { data, error, isLoading } = useSWR<{
    results: ProjectFormCardProps[];
  }>("/projects", fetcher);

  if (isLoading) {
    return <ProjectShimmer />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.results.map((project) => (
        <ProjectCard key={project.projectName} {...project} data={project} />
      ))}
    </div>
  );
};

const ProjectsPage = async () => {
  
  

  return (
    <AppleWatchScroll>
      <div className="bg-gray-100 pb-12 h-full">
        <PageHeader />
        <div className="mx-12 my-8">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              landing
            </Link>
            <Link color="inherit" href="/#projects" scroll={false}>
              projects
            </Link>
            <Typography color="text.primary">All projects</Typography>
          </Breadcrumbs>
        </div>
        <div className="container mx-auto px-4">
          <ProjectsComponent />
        </div>
      </div>
    </AppleWatchScroll>
  );
};

export default ProjectsPage;
