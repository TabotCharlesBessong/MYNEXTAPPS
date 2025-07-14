//  auth middleware
import NextAuth  from "next-auth"
import authConfig from "@/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import {connectToDatabase} from "@/lib/db"

export const {handlers:{GET,POST},auth} = NextAuth({
  adapter:MongoDBAdapter(connectToDatabase()),
  ...authConfig,})