import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prismaDB';
import { loginUserSchema } from '@/schemas/userSchema';

export default {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginUserSchema.parse(credentials);
          console.log(credentials);

          const user = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
          });

          console.log(user);

          if (!user || !user.password || user.password === '')
            throw new Error('User not found');

          //const passwordsMatch = await bcrypt.compare(password, user.password);
          const passwordsMatch = password === user.password;
          console.log(passwordsMatch);

          if (passwordsMatch)
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
            };
          return null;
        } catch (error) {
          console.error('Error authorizing user:', error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
