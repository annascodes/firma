import { auth } from "@clerk/nextjs/server"
import { db } from "lib/db";
import moment from "moment";
import { NextResponse } from "next/server";
import { del } from '@vercel/blob';
import { Attachment } from "@prisma/client";

type PropType = {
    params: Promise<{ taskId: string }>
}

export async function PUT(req: Request, { params }: PropType) {
    // const { title, desc, due, projectId, assignTo, status, priority } = await req.json();
    const body = await req.json();
    const { taskId } = await params;
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerkId but user not found' }, { status: 401 })


    // let dueAt = moment(body.due).utc().toDate()

    console.log(body)
    try {
        const updatedTask = await db.task.update({
            where: {
                id: taskId
            },
            data: {
                ...(body.title && { title: body.title }),
                ...(body.desc && { description: body.desc }),
                ...(body.due && { dueAt: moment(body.due).utc().toDate() }),
                ...(body.projectId && { projectId: body.projectId }),
                ...(body.assigneeId && { assigneeId: body.assigneeId }),
                ...(body.status && { status: body.status }),
                ...(body.priority && { priority: body.priority }),
                // title: body.title,
                // description: body.desc,
                // dueAt,
                // projectId: body.projectId,
                // assigneeId: body.assignTo,
                // status: body.status,
                // priority: body.priority
            },
            include: {
                assignee: true,
            }
        })

        return NextResponse.json(updatedTask, { status: 200 })

    } catch (error) {
        console.log('Error while updating task:', error)
        return NextResponse.json({ error: 'Error while updating task:' }, { status: 500 })
    }

}


export async function DELETE(req: Request, { params }: PropType) {

    const { taskId } = await params;
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerkId but user not found' }, { status: 401 })


    try {
        // fetch that task first
        const task = await db.task.findUnique({
            where: { id: taskId },
            include: { attachments: true }, // ensures attachments is an array of objects, not strings
        })
        if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

        // delete attachments from vercel blob too
        if (task.attachments.length > 0) {
            await Promise.all(
                task.attachments.map(async (a) => {
                    try {
                        await del(a.url);
                    } catch (error) {
                        return NextResponse.json({ error: 'Blob error while deleting attachment url from vercel blob' }, { status: 500 })
                    }
                })
            );
        }

        //delete that attachments of task from db
        try {
            // as one task can have more than one attachment
            await db.attachment.deleteMany({
                where: { taskId: taskId }
            })

        } catch (error) {
            console.error('Error while deleting whole attachment from db: ', error)
            return NextResponse.json({ error: 'Error while deleting whole attachment from db' }, { status: 500 })
        }

        // delete that task now
        try {
            await db.task.delete({
                where: { id: taskId }
            })

        } catch (error) {
            console.error('Error while deleting task itself: ', error)
            return NextResponse.json({ error: 'Error while deleting task itself' }, { status: 500 })
        }

        return NextResponse.json({ message: "Task and attachments deleted" }, { status: 200 });
    } catch (error) {
        console.log('Error in deleting task and its attachments:', error)
        return NextResponse.json({ error: 'Error in deleting task and its attachments' }, { status: 500 })
    }


}