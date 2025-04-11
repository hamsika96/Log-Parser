const fs = require('fs');
const path = require('path');
const { URL } = require('url');

async function parseLogFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.trim().split('\n');

    const ipCounts = {};
    const urlCounts = {};
    const uniqueIps = new Set();

    lines.forEach(line => {
        const parts = line.split(' ');
        const ip = parts[0];
        const url = parts[6];

        // Add the IP to the uniqueIps Set
        uniqueIps.add(ip);

        // Strip query parameters from the URL
        const baseUrl = new URL(url, 'http://example.com').pathname; // Assuming a base URL to handle relative paths

        // Count IP occurrences
        ipCounts[ip] = (ipCounts[ip] || 0) + 1;

        // Count URL occurrences (base URL without query parameters)
        urlCounts[baseUrl] = (urlCounts[baseUrl] || 0) + 1;
    });

    // Sort and get top 3 IPs
    const topIps = Object.entries(ipCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
    
    // Sort and get top 3 URLs
    const topUrls = Object.entries(urlCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

    return {
        uniqueIps: uniqueIps.size,
        topUrls,
        topIps
    };
}

(async () => {
    const logFilePath = path.join(__dirname, 'access.log');
    const result = await parseLogFile(logFilePath);

    console.log('The number of unique IP addresses:', result.uniqueIps);
    console.log('The top 3 most visited URLs:', result.topUrls);
    console.log('The top 3 most active IP addresses:', result.topIps);
})();

module.exports = { parseLogFile };
