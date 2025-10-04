import { auth } from "@clerk/nextjs/server";
import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request,) {

    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerk id but user not found' }, { status: 401 })
    
    const body = await req.json()
    if(!body.id) return NextResponse.json({ error: 'Body is empty' }, { status: 400 })

    try {

        const joinReq = await db.companyJoinRequest.create({
            data: {
                userId: user.id,
                companyId: body.id,
            }
        })
        return NextResponse.json(joinReq, {status: 200})
    } catch (error) {
        console.log('Error POSTing companyjoinrequest: ', error)
        return NextResponse.json({ error: 'Error POSTing companyjoinrequest:' }, { status: 500 })
        
    }
}

export async function GET(req:Request) {
    const {userId} = await auth()
    if(!userId) return NextResponse.json({error:'Unauthorized'},{status: 401})
    const user = await db.user.findUnique({where:{clerkId: userId}})
    if(!user) return NextResponse.json({error:'There is clerk id but user not found'},{status: 401})  
        console.log('------------------------------**************-------------------------')
    
    try {
        const myJoinReqs = await db.companyJoinRequest.findMany({
            where:{
                userId: user.id,

            },
            include:{
                company:{select: {name:true}}
            }
        })
         return NextResponse.json(myJoinReqs,{status: 200})
        
    } catch (error) {
        console.log('Error in GETing my join requests:',error)
        return NextResponse.json({error:'Error in GETing my join requests'},{status: 500})
        
    }
}