import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {

	

	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid credentials");
				}

				const user = await prisma.users.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					throw new Error("User not found");
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isCorrectPassword) {
					throw new Error("Invalid credentials");
				}

				return user;
			},
		}),
	],

	pages: {
		signIn: "/login",
	},

	secret: process.env.NEXT_SECRET,
	debug: process.env.NODE_ENV === "development",
};
