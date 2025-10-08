import { auth } from "@clerk/nextjs/server"
import { db } from "lib/db"
import { NextResponse } from "next/server"


type PropType = {
    params: Promise<{ companyId: string }>
}

// GETting all the projects of the company user is employed in
export async function GET(req: Request, { params }: PropType) {

    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerk Id but user not found' }, { status: 401 })

    const { companyId } = await params;

    try {

        // const tasks = await db.task.findMany({where: {assigneeId: user.id}})

        // Fetch all departments with their projects where the user has assigned tasks
        const departments = await db.department.findMany({
            where: {
                companyId: companyId,
                projects: {
                    some: {
                        tasks: {
                            some: {
                                assigneeId: user.id, // 👈 only projects with tasks assigned to the user
                            },
                        },
                    },
                },
            },
            include: {
                projects: {
                    where: {
                        tasks: {
                            some: {
                                assigneeId: user.id,
                            },
                        },
                    },
                    // include: {
                    //     tasks: {
                    //         where: {
                    //             assigneeId: user.id,
                    //         },
                    //         select: {
                    //             id: true,
                    //             title: true,
                    //             status: true,
                    //             priority: true,
                    //         },
                    //     },
                    // },
                },
                company: true
            },
           
        });

        // Format response into your requested structure:
        // const formatted = departments.map((dept) => ({
        //     department: dept.name,
        //     projects: dept.projects.map((proj) => ({
        //         id: proj.id,
        //         name: proj.name,
        //         description: proj.description,
        //         tasks: proj.tasks,
        //     })),
        // }));

        return NextResponse.json(departments, { status: 200 });

    } catch (error) {
        console.log('Error in GETting all the projects of the company user is employed in:', error)
        return NextResponse.json({ error: 'Error in GETting all the projects of the company user is employed in:' }, { status: 500 })
    }




}