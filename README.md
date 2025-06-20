This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies via `pnpm`:
```
pnpm i
```

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

I have included a unit test in Vitest to demonstrate how a utility function could be tested.

Ordinarily, Storybook would be used alongside Chromatic to test for any UI regressions. For the sake of this test, I'm not including those.

## GQL Types

I haven't included any packages that autogenerate the response types from the GQL query, but in a real setting, that would be expected to be done. Instead, I've manually created the types and left some notes as to why they're manually set.

## Deployed on Vercel
This app can be seen deployed on Vercel at https://ani-list-8e9w.vercel.app/.
