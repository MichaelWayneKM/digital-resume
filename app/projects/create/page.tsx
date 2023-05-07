"use client";
import React, { useState } from "react";
import Head from "next/head";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import ReactSelect from 'react-select';
import AppleWatchScroll from "@/components/AppleWatchScroll";

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Required"),
  projectDuration: Yup.object().shape({
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
  }),
  projectSkills: Yup.array().of(Yup.string().required("Required")),
  projectDescription: Yup.string().required("Required"),
});

const skillsList = ["HTML", "CSS", "JavaScript", "React", "Node.js"];

const FormInput = ({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) => (
  <div className="my-4">
    <label className="block font-medium mb-2 text-gray-800">{label}</label>
    <Field
      type={type}
      name={name}
      className="block w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
    />
  </div>
);


const SkillSelect = ({ skills, name }: { skills: string[]; name: string }) => (
    <div className="my-4">
      <label className="block font-medium mb-2 text-gray-800">
        Skills Required
      </label>
      <Field name={name}>
        {({ field, form }: FieldProps<string[]>) => (
          <ReactSelect
            isMulti
            options={skills.map((skill) => ({ label: skill, value: skill }))}
            value={field.value.map((skill) => ({ label: skill, value: skill }))}
            onChange={(selectedOptions: any) => {
              form.setFieldValue(
                name,
                selectedOptions ? selectedOptions.map((option: any) => option.value) : []
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
}: {
  images: { name: string }[];
  setImages: (a: any) => void;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    //accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImages((prevImages: any) => [...prevImages, ...acceptedFiles]);
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
        {images.map((image, index) => (
          <li key={index}>{image.name}</li>
        ))}
      </ul>
    </div>
  );
};

const ProjectForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [images, setImages] = useState([]);

  const initialValues = {
    projectName: "",
    projectDuration: {
      startDate: "",
      endDate: "",
    },
    projectSkills: [],
    projectDescription: "",
  };

  return (
    <AppleWatchScroll>
        <div></div>
      <div className="max-w-md mx-auto p-10 my-40 bg-gray-200">
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: any) => console.log(values)}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <FormInput type={""} label="Project Name" name="projectName" />{" "}
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
                {errors.projectDescription && touched.projectDescription && (
                  <div className="text-red-500">
                    {errors.projectDescription}
                  </div>
                )}
              </div>
              <ImageUpload images={images} setImages={setImages} />
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </AppleWatchScroll>
  );
};

export default ProjectForm;
