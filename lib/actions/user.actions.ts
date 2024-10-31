// 'use server'

// import { ID } from "node-appwrite";
// import { createAdminClient, createSessionClient } from "../appwrite";
// import { cookies } from "next/headers.js";
// import { parseStringify } from "../utils";

// export const signIn = async () => {
//   try {

//   } catch (error) {
//     console.error('Error', error);

//   }
// }
// export const signUp = async (userData: SignUpParams) => {
//   const { email, password, firstName, lastName } = userData
//   try {
//     const { account } = await createAdminClient();

//     const newUserAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       `${firstName} ${lastName}`
//     );
//     const session = await account.createEmailPasswordSession(email, password);
//     return parseStringify(newUserAccount)
//     cookies().set("appwrite-session", session.secret, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//     });

//   } catch (error) {
//     console.error('Error', error);

//   }
// }

// // ... your initilization functions

// export async function getLoggedInUser() {
//   try {
//     const { account } = await createSessionClient();
//     const user = await account.get();
//     return parseStringify(user)
//   } catch (error) {
//     return error;
//   }
// }
