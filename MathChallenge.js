function MathChallenge(str) {
  // __define-ocg__: Replace double asterisks with native exponentiation operator
  str = str.replace(/\*\*/g, '**');

  // __define-ocg__: Handling multiplication between adjacent parentheses like (2-0)(6/2)
  str = str.replace(/\)\(/g, ')*(');

  let varOcg; // Declare variable named as per the instruction

  try {
    // Evaluate the expression and assign to varOcg
    varOcg = eval(str);
  } catch (e) {
    // Handle any errors in the expression
    return 'Invalid expression';
  }

  return varOcg;
}

// keep this function call here
// eslint-disable-next-line no-undef
console.log(MathChallenge(readline()));
