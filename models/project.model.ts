import mongoose, { Schema, Document } from "mongoose";

type Image = { name: string; path: string; base64: string };

interface IProject extends Document {
  projectName: string;
  projectIcon?: Image;
  projectCover: Image;
  projectDescription: string;
  screenshots: Image[];
  projectDuration: {
    startDate: string;
    endDate: string;
  };
}

const projectSchema: Schema = new Schema({
  projectName: { type: String, required: true, unique: true },
  projectIcon: { type: Schema.Types.Mixed },
  projectCover: { type: Schema.Types.Mixed, required: true },
  projectUrl: { type: String },
  githubUrl: { type: String },
  projectSkills: { type: Array<String>, required: true },
  projectDescription: { type: String, required: true },
  screenshots: { type: Schema.Types.Mixed, required: true },
  projectDuration: { type: Schema.Types.Mixed, required: true },
});

const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
