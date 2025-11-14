import type { Prisma } from "@prisma/client";
import { db } from "lib/db";
import { NextResponse } from "next/server"

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const keyword = searchParams.get('keyword') || '';
    if (keyword === undefined || keyword === '') {
        return NextResponse.json({ error: 'Atleast write something to  search...' }, { status: 400 })
    }
    // const where:Prisma.UserWhereInput ={}
    try {
        const users = await db.user.findMany({
           where:{
            OR: [
                {name: {contains: keyword, mode:"insensitive"}},
                {email: {contains:keyword, mode: 'insensitive'}}
            ]
           },
           take: 5
           
        })

        return NextResponse.json(users, {status: 200})


    } catch (error) {
        console.log('Err in getting Firma users', error)
        return NextResponse.json({ error: 'Err in getting Firma users' }, { status: 500 })
    }

}