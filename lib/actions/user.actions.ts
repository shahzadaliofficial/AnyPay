

'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({ email, password }: signInProps) => {
    try {
        //signin 
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(session)

    } catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async (data: SignUpParams) => {
    try {
        //signup
        const { email, password, firstName, lastName } = data
        const name = `${firstName} ${lastName}`
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, name);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount)
    } catch (error) {
        console.error('Error', error)
    }
}
// ... your initilization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user)
    } catch (error) {
        return null;
    }
}


export const logoutAccount = async() => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session')
        await account.deleteSession('current')
        return true;
    } catch(error) {
        return false;

    }
}