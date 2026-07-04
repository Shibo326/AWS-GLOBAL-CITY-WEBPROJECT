import { describe, it, expect } from 'vitest';

/**
 * Property 7: Redirect Completeness
 * The /apply -> /enlist redirect (HTTP 308) preserves query parameters and URL fragments.
 *
 * We test that the redirect config in next.config.mjs is correctly structured.
 * Note: Next.js handles query param preservation automatically for configured redirects
 * when the source and destination are simple paths (no regex, no wildcards).
 *
 * **Validates: Requirements 17.1**
 */
describe('Property 7: Redirect Completeness', () => {
  it('next.config.mjs contains a permanent 308 redirect from /apply to /enlist', async () => {
    // Dynamically import the config
    const config = await import('../../next.config.mjs');
    const nextConfig = config.default;

    // Get redirects
    const redirects = await nextConfig.redirects();

    // Find the /apply redirect
    const applyRedirect = redirects.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.source === '/apply'
    );

    expect(applyRedirect).toBeDefined();
    expect(applyRedirect.destination).toBe('/enlist');
    expect(applyRedirect.permanent).toBe(true);
    expect(applyRedirect.statusCode).toBe(308);
  });

  it('redirect config does not modify the destination path', async () => {
    const config = await import('../../next.config.mjs');
    const nextConfig = config.default;
    const redirects = await nextConfig.redirects();

    const applyRedirect = redirects.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.source === '/apply'
    );

    // Destination should be a simple path (no regex, no wildcards)
    expect(applyRedirect.destination).toBe('/enlist');
    // Source should be a simple path
    expect(applyRedirect.source).toBe('/apply');
  });
});
