import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { db } from "../../../../../../lib/db"
import { JoinStatus } from "@prisma/client"

type PropType = {
    params: Promise<{ companyId: string }>
}

export async function GET(req: Request, { params }: PropType) {
    const { companyId } = await params;
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized or no logged in.' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'no user with this clerkId' }, { status: 401 })
 
    const {searchParams} = new URL(req.url)
    const status  = searchParams.get('status') as JoinStatus
        console.log('------------------company/s join requests here-------------')
        console.log(companyId)
    try {
        const joinRequests = await db.companyJoinRequest.findMany({
            where: {
                companyId: companyId,
                status, // ERROR under status
            },
            include:{
                user:true,
            }
        })

        return NextResponse.json(joinRequests, { status: 200 })
    } catch (error) {
        console.log('Error in GETting  company>s join requests:', error)
        return NextResponse.json({ error: 'Error in GETting  company>s join requests:' }, { status: 500 })
    }


}