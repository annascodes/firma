import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { db } from "../../../../../lib/db"

type ParamsType = { params: Promise<{ companyId: string }> }

export async function GET(req: Request, { params }: ParamsType) {

    const { companyId } = await params;
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerk id but user not found' }, { status: 401 })

    try {
        const company = await db.company.findUnique({
            where: {
                ownerId: user.id,
                id: companyId,
            },
            select: {
                id: true,
                name: true,
                departments: {
                    select: {
                        id: true,
                        name: true,
                        projects: {
                            select: {
                                id: true,
                                name: true,
                                companyId:true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(company, { status: 200 })

    } catch (error) {
        console.log('Error while GETting company via companyId: ', error)
        return NextResponse.json({ error: 'Error while GETting company via companyId' }, { status: 500 })
    }


}