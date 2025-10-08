import { auth } from "@clerk/nextjs/server"
import { db } from "lib/db"
import { NextResponse } from "next/server"


type PropType = {
    params: Promise<{ companyId: string }>
}

export async function GET(req: Request, { params }: PropType) {
    const {companyId} = await params;
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerk id but user not found' }, { status: 401 })

    try {
        const compUsers = await db.companyMembership.findMany({
            where:{
                companyId,
            },
            include:{
                user: true,
            }
        })

        return NextResponse.json(compUsers, { status: 200 })
        
    } catch (error) {
        console.log('Error in GETting all the users of the company: ',error)
        return NextResponse.json({ error: 'Error in GETting all the users of the company' }, { status: 500 })
    }

}