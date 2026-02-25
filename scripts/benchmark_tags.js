import { performance } from 'perf_hooks';

// Simulate dataset
const numTiles = 1000; // Increased to 1000 to make it more noticeable
const tagsPerTile = 5;
const iterations = 50000; // Increased iterations
const allTags = ['design', 'code', 'product', 'management', 'ai', 'data', 'cloud', 'security', 'network', 'web'];

const tiles = [];
for (let i = 0; i < numTiles; i++) {
  const tileTags = [];
  for (let j = 0; j < tagsPerTile; j++) {
    tileTags.push(allTags[Math.floor(Math.random() * allTags.length)]);
  }
  // Remove duplicates
  const uniqueTags = [...new Set(tileTags)];
  tiles.push({
    tagsString: uniqueTags.join(','),
    tagsSet: new Set(uniqueTags)
  });
}

// Inefficient String Matching (Hypothetical)
function benchmarkStringMatching() {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const searchTag = allTags[Math.floor(Math.random() * allTags.length)];
    let matches = 0;

    for (const tile of tiles) {
      const tags = tile.tagsString;
      const startPattern = searchTag + ',';
      const endPattern = ',' + searchTag;
      const midPattern = ',' + searchTag + ',';

      if (tags === searchTag || tags.startsWith(startPattern) || tags.endsWith(endPattern) || tags.includes(midPattern)) {
        matches++;
      }
    }
  }
  return performance.now() - start;
}

// Optimized Set Membership (Current Implementation)
function benchmarkSetMembership() {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const searchTag = allTags[Math.floor(Math.random() * allTags.length)];
    let matches = 0;

    for (const tile of tiles) {
      if (tile.tagsSet.has(searchTag)) {
        matches++;
      }
    }
  }
  return performance.now() - start;
}

console.log('--- Benchmark Results ---');
console.log('Iterations:', iterations);
console.log('Tiles:', numTiles);

const stringTime = benchmarkStringMatching();
console.log('Inefficient String Matching:', stringTime.toFixed(2) + 'ms');

const setTime = benchmarkSetMembership();
console.log('Optimized Set Membership:', setTime.toFixed(2) + 'ms');

const improvement = ((stringTime - setTime) / stringTime) * 100;
console.log('Performance Improvement:', improvement.toFixed(2) + '%');
