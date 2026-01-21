/**
 * Build-time script to fetch blog posts from Cloudflare's blog
 * for author "xmflsct" (Zhiyuan Zheng)
 * 
 * Also fetches Hacker News popularity data when available
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUTHOR_URL = 'https://blog.cloudflare.com/author/xmflsct/';
const OUTPUT_PATH = join(__dirname, '../src/data/blogs.json');

/**
 * Fetches the author page and extracts blog post data
 */
async function fetchBlogPosts() {
    console.log('Fetching blog posts from Cloudflare...');

    const response = await fetch(AUTHOR_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch author page: ${response.status}`);
    }

    const html = await response.text();

    // Parse blog posts from the HTML
    // The blog uses a pattern where each post has:
    // - A link with the post URL and title
    // - A date in YYYY-MM-DD format
    const posts = [];

    // Match pattern: [Title](URL) followed by date on next line
    // Looking for links to blog posts (not author links or tag links)
    const postPattern = /\[([^\]]+)\]\((https:\/\/blog\.cloudflare\.com\/[^\/]+\/)\)\s*\n\s*(\d{4}-\d{2}-\d{2})/g;

    // Alternative: Match the HTML structure directly
    // The page has article cards with titles, URLs, and dates

    // Using regex to find post URLs and titles from anchor tags
    const linkPattern = /<a[^>]*href="(\/[^"\/]+\/)"[^>]*>([^<]+)<\/a>/g;
    const datePattern = /(\d{4}-\d{2}-\d{2})/g;

    // Parse the HTML to find article sections
    // Each article contains a title link and a date
    const articlePattern = /<article[^>]*>([\s\S]*?)<\/article>/gi;
    const articles = html.match(articlePattern) || [];

    for (const article of articles) {
        // Find the main title link (not author or tag links)
        const titleMatch = article.match(/<a[^>]*href="(\/[a-z0-9-]+\/)"[^>]*class="[^"]*"[^>]*>([^<]+)<\/a>/i) ||
            article.match(/<h[23][^>]*>[\s\S]*?<a[^>]*href="(\/[a-z0-9-]+\/)"[^>]*>([^<]+)<\/a>/i);

        // Find the date
        const dateMatch = article.match(/(\d{4}-\d{2}-\d{2})/);

        if (titleMatch && dateMatch) {
            const slug = titleMatch[1].replace(/\//g, '');
            const url = `https://blog.cloudflare.com${titleMatch[1]}`;
            const title = titleMatch[2].trim();
            const date = dateMatch[1];

            // Avoid duplicates
            if (!posts.find(p => p.slug === slug)) {
                posts.push({
                    slug,
                    url,
                    title,
                    date
                });
            }
        }
    }

    // Fallback: simpler pattern matching if article parsing fails
    if (posts.length === 0) {
        console.log('Using fallback parsing method...');

        // Find all blog post links and nearby dates
        const allContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

        // Known posts from the author page (manual fallback)
        const knownPosts = [
            { slug: 'cloudflare-npm-supply-chain-attack', title: "How Cloudflare's client-side security made the npm supply chain attack a non-event", date: '2025-10-24' },
            { slug: 'take-control-of-public-ai-application-security-with-cloudflare-firewall-for-ai', title: "Take control of public AI application security with Cloudflare's Firewall for AI", date: '2025-03-19' },
            { slug: 'how-we-train-ai-to-uncover-malicious-javascript-intent-and-make-web-surfing-safer', title: 'How we train AI to uncover malicious JavaScript intent and make web surfing safer', date: '2025-03-19' },
            { slug: 'cloudflare-security-posture-management', title: "One platform to manage your company's predictive security posture with Cloudflare", date: '2025-03-18' },
            { slug: 'collect-all-your-cookies-in-one-jar', title: 'Collect all your cookies in one jar with Page Shield Cookie Monitor', date: '2024-03-07' },
            { slug: 'account-security-analytics-and-events', title: 'Account Security Analytics and Events: better visibility over all domains', date: '2023-03-18' },
            { slug: 'security-analytics', title: 'New! Security Analytics provides a comprehensive view across all your traffic', date: '2022-12-09' },
            { slug: 'new-waf-experience', title: 'A new WAF experience', date: '2022-03-15' },
        ];

        for (const post of knownPosts) {
            posts.push({
                ...post,
                url: `https://blog.cloudflare.com/${post.slug}/`
            });
        }
    }

    console.log(`Found ${posts.length} blog posts`);
    return posts;
}

/**
 * Fetches Hacker News popularity data for a blog post URL
 */
async function fetchHNPopularity(url) {
    try {
        const hnUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(url)}&restrictSearchableAttributes=url`;
        const response = await fetch(hnUrl);

        if (!response.ok) return null;

        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
            // Find the best match (exact URL match preferred)
            const exactMatch = data.hits.find(hit => hit.url === url || hit.url === url.replace(/\/$/, ''));
            const hit = exactMatch || data.hits[0];

            // Verify this is actually a match for our URL
            if (hit.url && hit.url.includes(url.replace('https://blog.cloudflare.com/', '').replace('/', ''))) {
                return {
                    points: hit.points || 0,
                    comments: hit.num_comments || 0,
                    hnUrl: `https://news.ycombinator.com/item?id=${hit.story_id}`
                };
            }
        }

        return null;
    } catch (error) {
        console.warn(`Failed to fetch HN data for ${url}:`, error.message);
        return null;
    }
}

/**
 * Main function
 */
async function main() {
    try {
        // Fetch blog posts
        const posts = await fetchBlogPosts();

        // Fetch HN popularity for each post
        console.log('Fetching Hacker News popularity data...');
        for (const post of posts) {
            const hnData = await fetchHNPopularity(post.url);
            if (hnData) {
                post.hn = hnData;
                console.log(`  ${post.slug}: ${hnData.points} points, ${hnData.comments} comments`);
            }
        }

        // Sort by popularity (HN points) if available, then by date
        posts.sort((a, b) => {
            const aPoints = a.hn?.points || 0;
            const bPoints = b.hn?.points || 0;

            if (aPoints !== bPoints) {
                return bPoints - aPoints; // Higher points first
            }

            // Fall back to date (newer first)
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // Ensure output directory exists
        mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

        // Write to file
        writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
        console.log(`Wrote ${posts.length} posts to ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('Error fetching blogs:', error);
        process.exit(1);
    }
}

main();
