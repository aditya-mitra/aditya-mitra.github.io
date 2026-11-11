// The port the production build is served on for tests and Lighthouse.
// Derived from the checkout path so parallel worktrees never share a port.
// Override with PORT.
import { createHash } from 'node:crypto';

const hash = createHash('sha1').update(process.cwd()).digest().readUInt16BE(0);
export const port = Number(process.env.PORT) || 4400 + (hash % 500);
export const origin = `http://127.0.0.1:${port}`;
