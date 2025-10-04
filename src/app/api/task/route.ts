import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { db } from "../../../../lib/db"
import moment from "moment"

export async function POST(req: Request) {
    const { title, desc, due, projectId } = await req.json()
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'there is clerkId but no user' }, { status: 400 })

    const dueAt = moment(due)
        .utc()
        // .set({ hour: 12 }) // set noon UTC
        // .toISOString();
        .toDate()
    // const dueAt = new Date(due) // ISO string works directly
    try {
        const newTask = await db.task.create({
            data: {
                title,
                description: desc,
                dueAt,
                projectId: projectId,
                assigneeId: user.id
            },
            include:{
                assignee: {
                    select: {name: true}
                }
            }
        })

        return NextResponse.json(newTask, { status: 200 })

    } catch (error) {
        console.log('Error in POSTing new task :', error)
        return NextResponse.json({ error: 'Error in POSTing new task' }, { status: 500 })

    }

}