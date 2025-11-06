import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "lib/db";

type ParamsType = {
    params: Promise<{ companyId: string; }>
}
export async function GET(req: Request, { params }: ParamsType) {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerk id but user not found' }, { status: 401 })
    const { companyId } = await params;
    try {
        const companyInfo = await db.company.findUnique({
            where: {
                id:  companyId
            }, 
            include: {
                owner: {select: {name: true, email: true}},
                _count: {
                    select: {departments: true, projects: true, members: true }
                }
            }
        })
        console.log(companyInfo)
        return NextResponse.json(companyInfo, {status: 200})

    } catch (error) {
        console.error('Error while GETting companyInfo: ', error)
        return NextResponse.json({ error: 'Error while GETting companyInfo' }, { status: 500 })
    }

}