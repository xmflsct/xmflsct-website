/**
 * Build-time script to fetch blog posts from Cloudflare's blog
 * for author "xmflsct" (Zhiyuan Zheng) using the RSS feed
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RSS_URL = 'https://blog.cloudflare.com/author/xmflsct/rss';
const OUTPUT_PATH = join(__dirname, '../src/data/blogs.json');

/**
 * Parse RSS date to ISO format (YYYY-MM-DD)
 */
function parseRssDate(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
}

/**
 * Extract text content from CDATA or plain XML
 */
function extractContent(xml, tagName) {
    const regex = new RegExp(`<${tagName}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tagName}>`, 'i');
    const match = xml.match(regex);
    if (match) {
        return match[1].trim();
    }
    return '';
}

/**
 * Fetches the RSS feed and extracts blog post data
 */
async function fetchBlogPosts() {
    console.log('Fetching blog posts from RSS feed...');

    const response = await fetch(RSS_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xml = await response.text();

    // Parse items from RSS feed
    const posts = [];
    const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
    const items = xml.match(itemPattern) || [];

    for (const item of items) {
        const title = extractContent(item, 'title');
        const link = extractContent(item, 'link');
        const pubDate = extractContent(item, 'pubDate');

        if (title && link && pubDate) {
            posts.push({
                url: link,
                title,
                date: parseRssDate(pubDate)
            });
        }
    }

    console.log(`Found ${posts.length} blog posts`);
    return posts;
}

/**
 * Main function
 */
async function main() {
    try {
        // Fetch blog posts
        const posts = await fetchBlogPosts();

        // Sort by date (newer first)
        posts.sort((a, b) => {
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
