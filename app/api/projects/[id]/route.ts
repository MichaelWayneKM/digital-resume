import { connectDb } from "@/utils/connection";
import { projectRepo } from "@/utils/helper";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const opt = req.url.split("/");
  console.log(opt);
  const id = opt[opt.length - 1];

  console.log(id);

  try {
    await connectDb();
    console.log("Database connected!");

    const results = await projectRepo.getById(id);

    if (results == null) {
      return NextResponse.json({ error: "No project found matching id" });
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
