import { auth } from "@clerk/nextjs/server";
import { db } from "lib/db";
import { NextResponse } from "next/server";



// GETting all the companies user is employed
export async function GET(req: Request) {

    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'There is clerk Id but user not found' }, { status: 401 })

       try {
        const employeedIn = await db.companyMembership.findMany({
            where:{
                userId: user.id,
                company:{
                    ownerId:{not: user.id}
                }
            },
            include:{
                company: true
            },
            orderBy:{
                createdAt: 'desc'
            }
        })
        
        return NextResponse.json(employeedIn, {status: 200})
       } catch (error) {
        console.log('Error in GETting all the companies user is employed:' ,error)
        return NextResponse.json({error:'Error in GETting all the companies user is employed' },{status: 500})
       } 



}