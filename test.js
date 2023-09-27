function isPhishingURL(url) {
    // Check for suspicious keywords or patterns
    const suspiciousKeywords = ['login', 'account', 'password', 'verify', 'update', 'secure', 'bank', 'paypal', 'signin'];
    const greekPattern = /[α-ω]/i;
    const cyrillicPattern = /[а-я]/i;
    const suspiciousPatterns = [
    //   /(\b\d{3}\b|\b\d{4}\b|\b\d{6}\b)/,   // Matches 3, 4, or 6-digit numbers
      /(confirm|validate|verify)[^\w]*$/i,  // Matches words like confirm, validate, or verify at the end of the URL
      /@/  // Matches URLs with "@" symbol
    ];
  
    // Check for IP address in the URL
    const ipAddressPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  
    // Check for URL shorteners
    // const urlShortenerPattern = /(bit\.ly|goo\.gl|tinyurl\.com|t\.co|ow\.ly)/i;

    // Check for mismatched or suspicious domains
    const domain = url.split('/')[2];  // Extract the domain from the URL
    const domainParts = domain.split('.');
  
    if (domainParts.length >= 2) {
      const topLevelDomain = domainParts[domainParts.length - 1];
      const secondLevelDomain = domainParts[domainParts.length - 2];
  
      if (topLevelDomain.length < 2 || secondLevelDomain.length < 2) {
        console.log('Contains suspicious domain structure')
        return true;  // Suspicious domain structure
      }
    }
  
    // Check for suspicious keywords in the URL
    for (const keyword of suspiciousKeywords) {
      if (url.toLowerCase().includes(keyword)) {
        console.log('Contains suspicious keywords')
        return true;
      }
    }
  
    // Check for suspicious patterns in the URL
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url)) {
        console.log('Contains suspicious patterns')
        return true;
      }
    }
  
    // Check for IP addresses in the URL
    if (ipAddressPattern.test(url)) {
    console.log('Contains IP Address')
    return true;
    }

    if (cyrillicPattern.test(url)) {
        console.log('Contains Cryllic characters')
        return true;
        }
    
    if (greekPattern.test(url)) {
        console.log('Contains Greek characters')
        return true;
        }
  
    // // Check for URL shorteners
    // if (urlShortenerPattern.test(url)) {
    //   return true;
    // }

    const htmlEntityPattern = /%[0-9A-Fa-f]{2}/;
    if (htmlEntityPattern.test(url)) {
    console.log('Contains hex entities')
    return true;
    }
  
    return false;  // URL is not identified as phishing
  }
  
  function detectHomoglyphs(url) {
    const homoglyphMappings = {
      'o': '0', 'ο': 'o', 'Ο': 'o', 'о': 'o', 'l': '1', 'I': 'l', '|': 'l', '!': 'l',
      'ι': 'l', 'ί': 'l', 'І': 'l', 'z': '2', 'ζ': 'z', 'З': 'z', 'з': 'z', 'e': '3',
      'ε': '3', 'Ε': '3', 'a': '4', 'Α': '4', 'а': 'a', 's': '5', 'Σ': 's', 'ѕ': 's',
      'ς': 'c', 'b': '8', 'Β': '8', 'б': '6', 't': '7', 'τ': 't', 'Τ': 't', 'в': '8',
      'g': '9', 'Γ': 'g', 'г': 'g', 'і': 'i', '0': 'o', '1': 'l', '2': 'z', '5': 's',
      '7': 't', '9': 'g', 'с': 'c', 'С': 'c', 'р': 'p', 'Р': 'p', 'A': 'a', 'е': 'e',
      'E': 'e', 'х': 'x', 'X': 'x', 'Х': 'x', 'у': 'y', 'Y': 'y', 'Υ': 'y', 'κ': 'k',
      'K': 'k', 'Κ': 'k', 'м': 'm', 'M': 'm', 'М': 'm', 'н': 'H', 'Н': 'H'
    };
  
    const homoglyphsFound = {};

    for (const char of url) {
      const baseCharList = homoglyphMappings[char.toLowerCase()];
      if (baseCharList) {
        if (!homoglyphsFound[baseCharList]) {
          homoglyphsFound[baseCharList] = [];
        }
        homoglyphsFound[baseCharList].push(char);
      }
    }
  
    return homoglyphsFound;
  }

  const userInputUrl = process.argv[2];

  if (!userInputUrl) {
    console.error('Please provide a URL as an argument.');
    process.exit(1);
  }
  
  // Perform phishing URL detection
  const isPhishing = isPhishingURL(userInputUrl);
  const homoglyphs = detectHomoglyphs(userInputUrl);
  console.log('URL:', userInputUrl);
  console.log('Is phishing URL:', isPhishing);
  console.log('Suspected homoglyphs:', homoglyphs);
  