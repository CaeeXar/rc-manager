import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                const user = await res.json()
                if (res.ok && user) return user;
                return null;
            }
        }),
    ],
    callbacks: {
        session({ session, token, user }) {
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
})