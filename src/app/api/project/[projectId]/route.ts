import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(req:Request,{params}:{params: Promise<{projectId:string}>}) {
    const {projectId} = await params;

    try {
        const proj = await db.project.findUnique({
            where:{
                id:projectId
            },
            include:{
                tasks:{
                    orderBy: {
                        updatedAt: 'desc'
                    },
                    take: 5,
                    include:{
                        assignee: {select:{name: true}}
                    }
                },
                company: true,
                department: true,
                
            }
        })
        return NextResponse.json(proj, {status:200})
        
    } catch (error) {
        console.log('Error in GETting project: ', error)
        return NextResponse.json({error: 'Error in GETting project'},{status: 200})
    }


    
}