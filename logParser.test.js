const fs = require('fs');
const path = require('path');
const { parseLogFile } = require('./logParser');

const mockLogData = `
177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
177.71.128.22 - - [10/Jul/2018:22:22:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
177.71.128.21 - - [10/Jul/2018:22:23:28 +0200] "GET /home/ HTTP/1.1" 200 3574
177.71.128.21 - - [10/Jul/2018:22:24:28 +0200] "GET /about/ HTTP/1.1" 200 3574
177.71.128.23 - - [10/Jul/2018:22:25:28 +0200] "GET /home/ HTTP/1.1" 200 3574
`;

beforeAll(() => {
    fs.writeFileSync(path.join(__dirname, 'mock.log'), mockLogData);
});

afterAll(() => {
    fs.unlinkSync(path.join(__dirname, 'mock.log'));
});

test('should parse log file and return correct stats', async () => {
    const result = await parseLogFile(path.join(__dirname, 'mock.log'));

    expect(result.uniqueIps).toBe(3);
    expect(result.topUrls).toEqual([
        ['/intranet-analytics/', 2],
        ['/home/', 2],
        ['/about/', 1]
    ]);
    expect(result.topIps).toEqual([
        ['177.71.128.21', 3],
        ['177.71.128.22', 1],
        ['177.71.128.23', 1]
    ]);
});
