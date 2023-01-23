import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from '../../../database/connection'
import Users from '../../../model/Schema'
import {compare} from 'bcryptjs'

export default NextAuth({
	providers: [
		// Google Provider
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		GithubProvider({
			clientId:process.env.GITHUB_ID,
			clientSecret:process.env.GITHUB_SECRET
		}),
		CredentialProvider({
			name:"Credentials",
			async authorize(credentials,req){
        connectMongo().catch(error =>{error:"Connection Failed...!"})

				// check user
				const result = await Users.findOne({email:credentials.email})
				if(!result){
					throw new Error('No user found with the email , please sign up')
				}

				// compare the passwords
				const checkedPassword = await compare(credentials.password,result.password)

				// check incorect password
				if(checkedPassword || result.email !== credentials.email) {
					throw new Error('Username or Password does not match')
				}

				return result
			}
		})
	],
});
