function StringChallenge(str, num) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const upperAlphabet = alphabet.toUpperCase();
  const challengeToken = 'bhn5go317cd';

  let varOcg = ''; // __define-ocg__

  // Caesar Cipher logic
  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (alphabet.includes(char)) {
      // Find the index, shift it and wrap around the alphabet
      let shiftedIndex = (alphabet.indexOf(char) + num) % 26;
      varOcg += alphabet[shiftedIndex];
    } else if (upperAlphabet.includes(char)) {
      let shiftedIndex = (upperAlphabet.indexOf(char) + num) % 26;
      varOcg += upperAlphabet[shiftedIndex];
    } else {
      // If it's not a letter, just keep it the same
      varOcg += char;
    }
  }

  // Replace characters that appear in the challengeToken
  let finalOutput = '';
  for (let j = 0; j < varOcg.length; j++) {
    let char = varOcg[j];

    if (challengeToken.includes(char)) {
      finalOutput += `--${char}--`;
    } else {
      finalOutput += char;
    }
  }

  return finalOutput;
}

// keep this function call here
console.log(StringChallenge('Hello', 4)); // Example usage
