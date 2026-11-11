import { defineConfig, devices } from '@playwright/test';
import { origin } from './scripts/port.mjs';

// The one test seam: the production build (dist/), served locally, driven
// through a real browser at a mobile and a desktop viewport.
// `bun run test` builds first; `bun run test:only` reuses the existing dist/.
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['list']],
  use: { baseURL: origin },
  webServer: {
    command: "node scripts/serve.mjs",
    url: origin,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
});
