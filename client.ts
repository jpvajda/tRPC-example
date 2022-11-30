// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';
 


// Notice the <AppRouter> generic here.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});


// Inferred types
const user = await trpc.userById.query('1');
 
const createdUser = await trpc.userCreate.mutate({ name: 'sachinraja' });