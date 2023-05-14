import { ProjectFormProps } from "@/app/projects/create/page";
import Project from "@/models/project.model";

export const projectRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Project.find();
}

async function getById(id: string) {
  return await Project.findById(id);
}

async function create(params: ProjectFormProps) {
  // validate
  // if (await Project.findOne({ username: params.username })) {
  //     throw 'Username "' + params.username + '" is already taken';
  // }

  try {
    const project = await Project.create(params);

    // save project
    return project;
  } catch (err: any) {
    return { error: err.message };
  }
}

async function update(id: string, params: ProjectFormProps) {
  // find project by id and update properties using $set
  return await Project.findByIdAndUpdate(id, { $set: params }, { new: true });
}

async function _delete(id: string) {
  await Project.findByIdAndRemove(id);
}
