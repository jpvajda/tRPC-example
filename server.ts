import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// The following creates a query procedure called userById that takes a single string argument and returns a user object:

const t = initTRPC.create();
interface User {
  id: string;
  name: string;
}

const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
];

const appRouter = t.router({
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const input = req.input;
      const user = userList.find((it) => it.id === input);
 
      return user;
    }),
  userCreate: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const id = `${Math.random()}`;
 
      const user: User = {
        id,
        name: req.input.name,
      };
 
      userList.push(user);
 
      return user;
    }),
});


// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;