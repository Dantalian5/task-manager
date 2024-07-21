import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prismaDB';

const getUserByEmail = async (email: string) => {
  return { id: 1, name: 'test', email: 'test', password: '1234' };
};

export default {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = { email: 'test', password: '1234' };

        const user = await getUserByEmail(email);

        if (!user || !user.password || user.password === '') return null;

        const passwordsMatch = true;

        if (passwordsMatch)
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
