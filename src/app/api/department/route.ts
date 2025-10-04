import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(req: Request) {
    const body = await req.json()
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'no user of this clerkId' }, { status: 401 })
    
    console.log('############ body ###########')
    console.log(body)

    try {
        const newDepart = await db.department.create({
            data: {
                name: body.departName,
                companyId: body.CompanyId,
            }
        })
        return NextResponse.json(newDepart, {status: 200})

    } catch (error) {
        console.log("Error in creating new department: ",error)
        return NextResponse.json({error:'Error in creating new department'},{status: 500})

    }

   

}