import { NextResponse } from "next/server"
import { db } from "../../../../lib/db"

type PostBodyType = {name: string, desc:string; departmentId:string, companyId: string}
export async function POST(req:Request) {

    const {name, desc, departmentId, companyId}:PostBodyType = await req.json()

    if(!name || name.trim()==='' || !desc || desc.trim()=== '' || !departmentId || !companyId)
        return NextResponse.json({error: 'Name , Description, Department Id and Company Id required for creating project'},{status:400 })

    try {
        const newProj = await db.project.create({
            data: {
                name: name,
                description: desc,
                companyId: companyId,
                departmentId: departmentId,
            }
        })
        return NextResponse.json(newProj,{status: 200})
        
    } catch (error) {
        console.log(`Error in creating project for a department (${departmentId}): `,Error)
        return NextResponse.json({error: `Error in creating project for a department (${departmentId})`},{status: 500})
    }
    
    
    
    
}