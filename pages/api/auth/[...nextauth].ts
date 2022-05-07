import NextAuth, { DefaultUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ErrorCodes } from '../../../js/types';

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials, req) {
                if (!credentials) throw new Error("No credentials!");

                const res = await fetch(process.env.NEXTAUTH_URL + '/api/signin', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();

                if (res.ok && data) {
                    return { id: data.username, username: data.username, name: data.username };
                } else if (data.error === ErrorCodes.ERROR_WRONG_USER) {
                    throw new Error(`Wrong username! There is no such user as "${credentials.username}".`);
                } else if (data.error === ErrorCodes.ERROR_WRONG_PASSWORD) {
                    throw new Error(`Wrong password given!`);
                } else {
                    throw new Error(`Unexpexted error occurred!`);
                }
            }
        }),
    ],

    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },

    secret: process.env.NEXTAUTH_SECRET,

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.user = { ...user };
            }

            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token || account.accessToken;
            }

            return token;
        },
        async session({ session, user, token }) {
            if (token && token.user && typeof token.user === 'object') {
                let defaultUser: DefaultUser = {
                    id: '',
                    name: null,
                    email: null,
                    image: null,
                };

                session.user = { ...defaultUser, ...token.user };
            }

            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session;
        },
    },
})