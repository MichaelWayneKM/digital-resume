import { ProjectFormProps } from "@/app/projects/create/page";
import { generateCoolQueryParams } from "@/utils/cool";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export interface ProjectFormCardProps extends ProjectFormProps {
  _id: string;
  data: ProjectFormProps;
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white min-w-[330px] shadow-sm rounded-md overflow-hidden filter grayscale hover:scale-[10 px] hover:shadow-2xl hover:grayscale-0 border-2 transition-all duration-300">
      <div className="p-4">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="text" width="50%" height={30} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="50%" height={20} />
      </div>
    </div>
  );
};

export const ProjectCard = ({
  _id,
  projectName,
  projectIcon,
  projectCover,
  projectSkills,
  projectDescription,
  screenshots,
  projectDuration,
  data,
}: ProjectFormCardProps) => {
  const endDate = new Date(projectDuration.endDate);
  const isValidEndDate = !isNaN(endDate.getTime());
  const isInProgress = isValidEndDate && endDate.getTime() > Date.now();

  return (
    <div
      className={`bg-white min-w-[330px] shadow-sm rounded-md overflow-hidden filter grayscale hover:scale-[10 px] hover:shadow-2xl hover:grayscale-0 ${
        isInProgress ? "hover:border-blue-200" : "hover:border-green-200"
      } border-2 transition-all duration-300`}
    >
      <div className="p-4">
        <Link
          href={{
            pathname: `/projects/project/projectid:towzone==${_id}`,
            //query: generateCoolQueryParams(),
          }}
          className={`flex items-center text-lg font-semibold text-gray-800 ${
            isInProgress ? "hover:text-blue-500" : "hover:text-green-500"
          } transition-colors duration-300`}
        >
          <span className="mr-2">{projectName}</span>
          <FontAwesomeIcon icon={faLink} size={"1x"} />
        </Link>

        <p className="mt-2 text-sm text-gray-600">{projectDescription}</p>

        <div className="font-semibold my-10">
          <span className="font-extralight">skills:</span>{" "}
          {projectSkills.join(", ").toString()}
          <div className="flex  items-start">
            {projectSkills.map((skill, index) => (
              <div
                key={index}
                className="w-10 mr-4 mt-8 rounded-full overflow-hidden"
              >
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg`}
                  style={{ objectFit: "cover" }}
                  alt={`${skill}-icon`}
                  height={100}
                  width={100}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span
            className={`inline-block px-2 py-1 rounded-full text-sm font-medium text-white 
      ${isInProgress ? "bg-blue-500" : "bg-green-400"}`}
          >
            {isInProgress ? "In Progress" : "Completed"}
          </span>
          {projectIcon && (
            <img
              className={`w-8 h-8 rounded-full ${
                isInProgress ? "border-blue-500" : "border-green-400"
              } border-2`}
              src={projectIcon.base64}
              alt={projectIcon.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};
