import { auth } from "@clerk/nextjs/server"
import { db } from "lib/db"
import { NextResponse } from "next/server"

type PropType = {
    params: Promise<{ companyId: string, companyJoinReqId: string }>
}

export async function PUT(req: Request, { params }: PropType) {
    const { companyId, companyJoinReqId } = await params;
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized or no logged in.' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'no user with this clerkId' }, { status: 401 })

    const body = await req.json()

    try {
        const updCompJoinReq = await db.companyJoinRequest.update({
            where: {
                id: companyJoinReqId,
                // companyId: companyId,
            },
            data:{
                status:body.status
            }
        })

        if(body.status === 'APPROVED' && updCompJoinReq.status === 'APPROVED' ){
            //then generate membership
            const newCompMembership = await db.companyMembership.create({
                data:{
                    userId: updCompJoinReq.userId,
                    companyId: updCompJoinReq.companyId,
                }
            })
            return NextResponse.json({newMemberShip: newCompMembership,updatedJoinReq: updCompJoinReq},{status: 200})
        }
         return NextResponse.json({updatedJoinReq: updCompJoinReq},{status: 200})
        
    } catch (error) {
        console.log('Error in PUTting response to the join request to company:', error)
        return NextResponse.json({ error: 'Error in PUTting response to the join request to company' }, { status: 500 })
    }
}