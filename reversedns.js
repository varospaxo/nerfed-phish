const axios = require('axios');
const dns = require('dns');

const apiUrl = 'https://api.ipgeolocation.io/ipgeo';

if (process.argv.length < 3) {
  console.log('Usage: node reverseDnsFromUrl.js <URL>');
  process.exit(1);
}

const url = process.argv[2];

// Function to get the IP address from the URL using IP geolocation API
async function getIpAddressFromUrl(url) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        apiKey: 'YOUR_IPGEOLOCATION_API_KEY', // Replace with your API key
        domain: url,
      },
    });

    const ipAddress = response.data.ip;
    return ipAddress;
  } catch (error) {
    console.error('Error fetching IP address:', error.message);
    process.exit(1);
  }
}

// Function to perform a reverse DNS lookup
async function reverseDnsLookup(ipAddress) {
  return new Promise((resolve, reject) => {
    dns.reverse(ipAddress, (err, hostnames) => {
      if (err) {
        reject(new Error('Error during reverse DNS lookup'));
      } else {
        resolve(hostnames);
      }
    });
  });
}

(async () => {
  try {
    const ipAddress = await getIpAddressFromUrl(url);
    console.log('IP address for', url, ':', ipAddress);

    const hostnames = await reverseDnsLookup(ipAddress);
    console.log('Reverse DNS lookup result:', hostnames.join(', '));
  } catch (error) {
    console.error(error.message);
  }
})();
