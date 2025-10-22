import { auth } from "@clerk/nextjs/server";
import { db } from "lib/db";
import { NextResponse } from 'next/server';

export async function GET(req:Request) {
   const {userId} = await auth()
   if(!userId) return NextResponse.json({error: 'Unauthorized'},{status: 401})
   const user = await db.user.findUnique({where:{clerkId: userId}})
   if(!user) return NextResponse.json({error: 'There is clerk id but no user found'},{status: 401})
   return NextResponse.json(user, {status: 200})
    
}