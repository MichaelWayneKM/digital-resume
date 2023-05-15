"use client";
import { useState } from "react";
import Head from "next/head";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import ReactSelect from "react-select";
import AppleWatchScroll from "@/components/AppleWatchScroll";
import Image from "next/image";
import useAuthentication, { LoginPage } from "@/app/hooks/useAuthentication";
import { Spinner } from "@/components/Spinner";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { skills } from "@/utils/cool";
import { uploadImageToFirebase } from "@/utils/firebase";

type Image = { name: string; path: string; url: string };

export interface ProjectFormProps {
  projectName: string;
  projectUrl?: string;
  githubUrl?: string;
  projectIcon?: Image;
  projectCover: Image;
  projectDescription: string;
  screenshots: Image[];
  projectSkills: string[];
  projectDuration: {
    startDate: string;
    endDate: string;
  };
}

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Required"),
  projectDuration: Yup.object().shape({
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
  }),
  projectSkills: Yup.array().of(Yup.string().required("Required")),
  projectDescription: Yup.string().required("Required"),
});

skills
  .sort((A, B) => B.skillRating - A.skillRating)
  .forEach((skill) => {
    skill.imgSrc = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.name.toLowerCase()}/${skill.name.toLowerCase()}-original.svg`;
    skill.imgAlt = `${skill.name} logo`;
  });

const skillsList = skills.map((skill) => skill.name);

const FormInput = ({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="my-4 overflow-hidden">
    <label className="block font-medium mb-2 text-gray-800">
      {label}
      {required ? "*" : ""}
    </label>
    {type === "file" ? (
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <div>
              <input
                type={type}
                accept="image/*"
                required={required}
                name={name}
                onChange={async (event: any) => {
                  const file = event.target.files[0];
                  //const reader = new FileReader();
                  // reader.onloadend = () => {
                  //   setFieldValue(name, {
                  //     file: file,
                  //     preview: reader.result as string,
                  //     url: reader.result || "", //?.toString().split(",")[1] || "",
                  //   });
                  // };
                  // if (file) {
                  //   reader.readAsDataURL(file);
                  // }

                  const url = await uploadImageToFirebase(file);

                  const fileData = {
                    name: file.name,
                    path: (file as any).path,
                    url: url,
                  };

                  setFieldValue(name, fileData);
                }}
                className="block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
              />
              {value?.url ?? <div>{value?.url}</div>}
            </div>
          );
        }}
      </Field>
    ) : (
      <Field
        type={type}
        name={name}
        required={required}
        className="block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
      />
    )}
  </div>
);

const SkillSelect = ({ skills, name }: { skills: string[]; name: string }) => (
  <div className="my-4">
    <label className="block font-medium mb-2 text-gray-800">
      Skills Used in project
    </label>
    <Field name={name}>
      {({ field, form }: FieldProps<string[]>) => (
        <ReactSelect
          isMulti
          options={skills.map((skill) => ({ label: skill, value: skill }))}
          value={field.value?.map((skill) => ({ label: skill, value: skill }))}
          onChange={(selectedOptions: any) => {
            form.setFieldValue(
              name,
              selectedOptions
                ? selectedOptions.map((option: any) => option.value)
                : []
            );
          }}
        />
      )}
    </Field>
  </div>
);

const ImageUpload = ({
  images,
  setImages,
  setField,
}: {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setField: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  const [loadingImageUri, setLoadingImageUri] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": ["*"] },
    onDrop: async (acceptedFiles: File[]) => {
      // Map each file to a promise that resolves to an object containing the file name and base64 data
      // const promises = acceptedFiles.map(
      //   (file) =>
      //     new Promise<Image>((resolve, reject) => {
      //       const reader = new FileReader();

      //       reader.onload = (event) => {
      //         if (!event.target) {
      //           reject(null);
      //           return;
      //         }

      //         const base64 = event.target.result as string;
      //         resolve({ name: file.name, path: (file as any).path, base64 });
      //       };

      //       reader.readAsDataURL(file);
      //     })
      // );

      // // Once all promises are resolved, update the state with the image data
      // Promise.all(promises).then((images) => {
      //   setImages((prevImages: Image[]) => [...prevImages, ...images]);
      //   setField("screenshots", images);
      // });

      const filesData: Image[] = [];

      setLoadingImageUri(true);
      try {
        for (const file of acceptedFiles) {
          const url = await uploadImageToFirebase(file);

          if (url) {
            const fileData = {
              name: file.name,
              path: (file as any).path,
              url: url,
            };

            filesData.push(fileData);
          }
        }

        setLoadingImageUri(false);
      } catch (err) {
        setLoadingImageUri(false);
      }

      // File data with name, path, and URL is available in the `filesData` array
      setImages((prevImages: Image[]) => [...prevImages, ...filesData]);
      setField("screenshots", filesData);
    },
  });

  return (
    <div className="my-4">
      <label className="block font-medium mb-2 text-gray-800">
        Upload Images
      </label>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-300 p-4 rounded-md"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <ul className="mt-4 text-slate-600">
        {loadingImageUri ? <Spinner /> : null}
        {images.map((image, index) => (
          <li key={index}>
            {image.name} - {image.url.substring(0, 40)}...
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProjectForm = () => {
  const {
    isLoggedIn,
    handleLogin,
    isWrongPassword,
    handleWrongPasswordAlertClose,
  } = useAuthentication();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const initialValues: ProjectFormProps = {
    projectName: "",
    projectDuration: {
      startDate: "",
      endDate: "",
    },
    projectCover: {
      url: "",
      name: "",
      path: "",
    },
    projectSkills: [],
    screenshots: [],
    projectDescription: "",
  };

  async function publishProject(values: ProjectFormProps) {
    setLoading(true);

    //console.log(values);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log(responseData, response.status);

      if (
        responseData["error"] &&
        responseData["error"].includes("duplicate")
      ) {
        setSuccess(false);
        setLoading(false);
        return alert("This project already exists in server");
      }

      if (responseData["_doc"]["_id"]) {
        setSuccess(true);

        setTimeout(() => {
          window.location.href = "/projects";
        }, 5500);
      } else {
        setSuccess(false);
        setLoading(false);
        alert("something went wrong");
      }
    } catch (err: any) {
      setLoading(false);
      alert(err.toString());
    }
  }

  return (
    <main>
      <AppleWatchScroll>
        {isLoggedIn ? (
          <div className="relative max-w-md mx-auto p-10 my-40 bg-gray-200 text-gray-800 border-separate border-spacing-2 border-cyan-700 border-2 rounded-lg">
            <h2 className="text-slate-800 text-5xl font-extrabold">
              Add a project
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values: any) => publishProject(values)}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form className="mt-10">
                  <FormInput
                    type={"text"}
                    label="Project Name"
                    required
                    name="projectName"
                  />{" "}
                  <FormInput
                    type={"text"}
                    label="Project url"
                    name="projectUrl"
                  />{" "}
                  <FormInput
                    type={"text"}
                    label="Github repo url"
                    name="githubUrl"
                  />{" "}
                  <FormInput
                    type={"file"}
                    label="Project Cover"
                    required
                    name="projectCover"
                  />{" "}
                  <FormInput
                    type={"file"}
                    label="Project Icon"
                    name="projectIcon"
                  />{" "}
                  <div className="my-4">
                    <label className="block font-medium mb-2 text-gray-800">
                      Project Duration
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => {
                            if (date != null) {
                              setStartDate(date);
                              setFieldValue("projectDuration.startDate", date);
                            }
                          }}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className="block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                        />
                      </div>
                      <div>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => {
                            setEndDate(date);
                            setFieldValue("projectDuration.endDate", date);
                          }}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className="block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                        />
                      </div>
                    </div>
                    {errors.projectDuration?.startDate &&
                      touched.projectDuration?.startDate && (
                        <div className="text-red-500">
                          {errors.projectDuration.startDate}
                        </div>
                      )}
                    {errors.projectDuration?.endDate &&
                      touched.projectDuration?.endDate && (
                        <div className="text-red-500">
                          {errors.projectDuration.endDate}
                        </div>
                      )}
                  </div>
                  <SkillSelect skills={skillsList} name="projectSkills" />
                  <div className="my-4">
                    <label className="block font-medium mb-2 text-gray-800">
                      Project Description
                    </label>
                    <Field
                      as="textarea"
                      name="projectDescription"
                      rows="5"
                      className="block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                    />
                    {errors.projectDescription &&
                      touched.projectDescription && (
                        <div className="text-red-500">
                          {errors.projectDescription}
                        </div>
                      )}
                  </div>
                  <ImageUpload
                    images={images}
                    setImages={setImages}
                    setField={setFieldValue}
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>

            {loading || isSuccess ? (
              <div className="absolute flex flex-col items-center place-items-center justify-center h-full w-full top-0 left-0 backdrop-blur-sm z-20">
                {loading && !isSuccess ? (
                  <Spinner />
                ) : loading && isSuccess ? (
                  <div className="flex items-center flex-col">
                    <FontAwesomeIcon icon={faCheckCircle} size={"4x"} />
                    <div className="text-slate-950 font-extrabold my-10 text-3xl">
                      success
                    </div>
                    <div className="flex items-center text-slate-950 font-extrabold my-10 text-3xl">
                      <Spinner />
                      <span className="m-4">redirecting</span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <LoginPage />
        )}
      </AppleWatchScroll>
    </main>
  );
};

export default ProjectForm;
