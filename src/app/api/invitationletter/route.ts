import { auth } from "@clerk/nextjs/server"
import { db } from "lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const {userId: currentClerkUser} = await auth()  
    if(!currentClerkUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 400 })
    const currentUser = await db.user.findUnique({where:{clerkId: currentClerkUser}})
    const { message, companyId, userId } = await req.json()
    if (!message || !companyId || !userId) {
        return NextResponse.json({ error: 'need message, companyId, userId for invitation letter' }, { status: 400 })
    }

    console.log('-----------------------------------')
    console.log(userId)
    console.log(currentUser)
    if(userId === currentUser?.id ){
         return NextResponse.json({error:`Can not send invitation to yourself` }, {status: 402})
    }

    try {
        const user = await db.user.findUnique({where:{id: userId}})

        
        const isSentAlready = await db.invitationLetter.findFirst({
            where: {
                userId,
                companyId,
            }
        })
        if(isSentAlready) {
            return NextResponse.json({error:`Already sent to ${user?.email}. Status is ${isSentAlready.status}` }, {status: 402})
        }
        const letter = await db.invitationLetter.create({
            data: {
                userId,
                companyId,
                message
            },
            include: {
                user: true,
                company: true,
            }
        })

        return NextResponse.json(letter, { status: 200 })

    } catch (error) {
        console.log('Error in POSTting invitation letter:', error)
        return NextResponse.json({ error: 'Error in POSTting invitation letter' }, { status: 500 })

    }


}