import { ProjectFormProps } from "@/app/projects/create/page";
import { connectDb } from "@/utils/connection";
import { projectRepo } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {



  try {
    await connectDb();
    console.log("Database connected!");

    const results = await projectRepo.getAll();

    if (results.length > 0) {
      return NextResponse.json({ results });
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function POST(req: Request, res: Response) {
    
  try {
    const data: ProjectFormProps =  await req.json();

    await connectDb();
    console.log("Database connected!");

    const result = await projectRepo.create(data);

    

    return new Response(JSON.stringify({ ...result }));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }));
  }
}
