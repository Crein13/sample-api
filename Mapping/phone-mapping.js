const phoneMap = {
  "2": "abc",
  "3": "def",
  "4": "ghi",
  "5": "jkl",
  "6": "mno",
  "7": "pqrs",
  "8": "tuv",
  "9": "wxyz",
};

function letterCombinations(digits) {
  if (!digits) {
    return [];
  }

  const combinations = [];
  backtrack(combinations, "", digits);
  return combinations;
}

function backtrack(combinations, current, remainingDigits) {
  if (!remainingDigits.length) {
    combinations.push(current);
    return;
  }

  const digit = remainingDigits[0];
  const letters = phoneMap[digit];
  for (let i = 0; i < letters.length; i++) {
    backtrack(combinations, current + letters[i], remainingDigits.slice(1));
  }
}

console.log(letterCombinations("23"));
console.log(letterCombinations(""));
console.log(letterCombinations("2"));
console.log(letterCombinations("257"));
