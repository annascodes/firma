import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db";

export const checkUser = async ()=>{
    const user = await currentUser(); // coming from clerk
    // console.log('-------------------------------checkUser')
    if(!user){
        console.log('---------no user found------------')
        return null;
    }

    const loggedInUser = await db.user.findUnique({
        where:{
            clerkId : user.id
        }
    })

    //note: if user found return him/her 
    if(loggedInUser) {
        // console.log('---------------------------giving you clerk user.id from db------')
        return loggedInUser;
    }

    console.log('------------------------------ creating newUser ------------------')
    //note: if note found then create one (new user) and return him/her
    const newUser = await db.user.create({
        data:{
            clerkId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0]?.emailAddress,
            image: user.imageUrl,

        }
    })
    return newUser;

}