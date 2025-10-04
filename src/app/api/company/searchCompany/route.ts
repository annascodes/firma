import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(req: Request) {

    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await db.user.findUnique({ where: { clerkId: userId }, include: { joinRequests: true } })
    if (!user) return NextResponse.json({ error: 'There is clerkId but user not found' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    if (search === '') return NextResponse.json({ error: 'Search can not be empty. Type something...' }, { status: 400 })

    try {
        const companies = await db.company.findMany({
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive',
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 50,

        })
        console.log('------------companies')
        console.log(companies)
        console.log('------------user.joinRequests')
        console.log(user.joinRequests)

        const requestCompanies = new Set(user.joinRequests.map(r => r.companyId))
        const response = companies.map(c => ({
            id: c.id,
            companyName: c.name,
            isSent: requestCompanies.has(c.id)
        }))
       
        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        console.log('Error in GETting search companies for joining :', error)
        return NextResponse.json({ error: 'Error in GETting search companies for joining' }, { status: 500 })

    }

}