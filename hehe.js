const axios = require('axios');
const cheerio = require('cheerio');

const userInputUrl = process.argv[2];

if (!userInputUrl) {
  console.error('Please provide a URL as an argument.');
  process.exit(1);
}

axios.get(userInputUrl)
  .then(response => {
    const $ = cheerio.load(response.data);
    const imageLinks = [];

    $('img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        // Check if the link is relative and convert it to absolute
        const absoluteSrc = src.startsWith('http') ? src : `${userInputUrl}${src}`;
        imageLinks.push(absoluteSrc);
      }
    });

    console.log('Image links:');
    console.log(imageLinks);
  })
  .catch(error => console.error('Error:', error));
