# HTTP Log File Parser

This script processes a log file containing HTTP request data and reports the following information:

1. The number of unique IP addresses in the log file.
2. The top 3 most visited URLs.
3. The top 3 most active IP addresses.

## Files

1. **logParser.js**: The main script that parses the log file and outputs the results.
2. **access.log**: A sample log file with test data.
3. **logParser.test.js**: A file containing test cases for validating the script.

## How to Run

1. Download this repository.
2. Install node modules
3. Place the `access.log` file in the same directory or modify the file path in `logParser.js` to point to your log file.
4. Run the script with Node.js:
   ```bash
   node logParser.js
