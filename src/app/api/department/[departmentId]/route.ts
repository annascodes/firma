import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ departmentId: string }> }) {
    const { departmentId } = await params;
    try {
        const fetchedDepart = await db.department.findUnique({
            where: {
                id: departmentId,
            },
            include: {
                company: true,
                projects: true,
            }
        })

    //   const report = // make me report in this formate  like
    const projReprot = {
        projName: 'alpha',
        totalTasks : 12,
        todo: 1,
        inprogress: 3,
        done: 5,
        blocked:2
    }
        return NextResponse.json(fetchedDepart, {status: 200})

    } catch (error) {
        console.log('Error in GETting department', error)
        return NextResponse.json({error: 'Error in GETting department'},{status: 500})
    }

}