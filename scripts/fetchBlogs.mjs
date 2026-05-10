/**
 * Build-time script to fetch blog posts from Cloudflare's blog
 * for author "xmflsct" (Zhiyuan Zheng) using the RSS feed
 */

import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RSS_URL = 'https://blog.cloudflare.com/author/xmflsct/rss';
const OUTPUT_PATH = join(__dirname, '../src/data/blogs.json');

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
    month: '2-digit',
    year: 'numeric'
});

/**
 * Parse RSS date to ISO format (YYYY-MM-DD)
 */
function parseRssDate(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 10);
}

/**
 * Extract content of a specific tag from an XML string within a given range.
 * Handles standard text content and CDATA sections.
 *
 * @param {string} xml - The full XML string.
 * @param {string} tagName - The tag name to extract (e.g., 'title').
 * @param {number} startIndex - The index to start searching from.
 * @param {number} endIndex - The index to stop searching at.
 * @returns {string|null} The extracted content or null if not found.
 */
function extractTagContent(xml, tagName, startIndex, endIndex) {
    const startTag = `<${tagName}>`;
    const endTag = `</${tagName}>`;

    const start = xml.indexOf(startTag, startIndex);
    if (start === -1 || start >= endIndex) {
        return null;
    }

    const contentStart = start + startTag.length;
    const end = xml.indexOf(endTag, contentStart);

    if (end === -1 || end > endIndex) {
        return null;
    }

    let content = xml.slice(contentStart, end);

    // Handle CDATA if present
    const cdataStart = '<![CDATA[';
    const cdataEnd = ']]>';

    const trimmed = content.trim();
    if (trimmed.startsWith(cdataStart) && trimmed.endsWith(cdataEnd)) {
        content = trimmed.slice(cdataStart.length, -cdataEnd.length);
    }

    return content.trim();
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

    // Parse items from RSS feed using indexOf to avoid regex overhead and memory allocation
    const posts = [];
    let pos = 0;

    while (true) {
        const itemStart = xml.indexOf('<item>', pos);
        if (itemStart === -1) break;

        const itemEnd = xml.indexOf('</item>', itemStart);
        if (itemEnd === -1) break;

        // Extract fields within the current item's range
        const title = extractTagContent(xml, 'title', itemStart, itemEnd);
        const link = extractTagContent(xml, 'link', itemStart, itemEnd);
        const pubDate = extractTagContent(xml, 'pubDate', itemStart, itemEnd);

        if (title && link && pubDate) {
            const dateObj = new Date(pubDate);
            posts.push({
                url: link,
                title,
                date: dateObj.toISOString().slice(0, 10),
                formattedDate: dateFormatter.format(dateObj)
            });
        }

        // Move past this item
        pos = itemEnd + 7; // length of </item>
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
        posts.sort((a, b) => b.date.localeCompare(a.date));

        // Ensure output directory exists
        await mkdir(dirname(OUTPUT_PATH), { recursive: true });

        // Write to file
        await writeFile(OUTPUT_PATH, JSON.stringify(posts, null, 2));
        console.log(`Wrote ${posts.length} posts to ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('Error fetching blogs:', error);
        process.exit(1);
    }
}

// Check if this script is being run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}

export { parseRssDate };
