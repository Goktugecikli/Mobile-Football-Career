export const appPaths = {
  bootstrap: '/',
} as const;

export type AppPath = (typeof appPaths)[keyof typeof appPaths];
