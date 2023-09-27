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
  
  function containsGreekLetters(url) {
    const greekPattern = /[α-ω]/i;
    return greekPattern.test(url);
  }
  
  function containsCyrillicLetters(url) {
    const cyrillicPattern = /[а-я]/i;
    return cyrillicPattern.test(url);
  }
  
  // Get user input for the URL
  const userInputUrl = process.argv[2];
  
  if (!userInputUrl) {
    console.error('Please provide a URL as an argument.');
    process.exit(1);
  }
  
  // Perform the checks
  const homoglyphs = detectHomoglyphs(userInputUrl);
  const containsGreek = containsGreekLetters(userInputUrl);
  const containsCyrillic = containsCyrillicLetters(userInputUrl);
  
  console.log('Original URL:', userInputUrl);
  console.log('Contains Greek letters:', containsGreek);
  console.log('Contains Cyrillic letters:', containsCyrillic);
  console.log('Suspected homoglyphs:', homoglyphs);

  