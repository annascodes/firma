import { auth } from "@clerk/nextjs/server";
import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized or not logged in.' },{status:401})
    const user = await db.user.findUnique({where: {clerkId: userId}})
    if(!user) return NextResponse.json({error: 'There is clerkId, but not user found having this clerkId '},{status: 401})

    const body = await req.json()
    console.log('----userId : ', userId)

    try {
        const newCompany = await db.company.create({
            data: {
                name: body.name,
                ownerId: user.id,
            }
        })

        return NextResponse.json(newCompany, { status: 200 })

    } catch (error) {
        console.log('---Error while creating new company: ', error)
        return NextResponse.json({ error: 'Error while creating new company ' }, { status: 500 })
    }

}

export async function GET(req:Request) {
    const {userId} = await auth()
    if(!userId) return NextResponse.json({error: 'Unauthorized or no logged in.' },{status: 401})
    const user = await db.user.findUnique({where: {clerkId: userId}})
    if(!user) return NextResponse.json({error: 'no user with this clerkId'},{status: 401})

    try {
        const usersCompanies = await db.company.findMany({
            where: {
                ownerId : user.id
            },
            include: {
                owner: true,
                departments: true,
                projects: true,
                members: true,
            }
        })

        return NextResponse.json(usersCompanies, {status: 200})
        
    } catch (error) {
        console.log("---Error while GET companies of current/logged-in user: ", error)
        return NextResponse.json({error:'Error while GET companies of current/logged-in user' },{status: 500})
        
    }
    
}