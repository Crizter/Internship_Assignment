import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            // Add Vercel Edge Functions and File System API support
            runtime: 'edge',
            regions: ['fra1']
        }),
        files: {
            assets: 'static'
        }
    }
};

export default config;
