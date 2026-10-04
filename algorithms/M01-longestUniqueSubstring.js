/**
 * M01 — Longest Substring Without Repeats   (statement: Practice PDF, Part A)
 *
 * Complete the 'longestUniqueSubstring' function below.
 *
 * The function is expected to return: INTEGER
 * The function accepts the following parameters:
 *  1. STRING s
 *
 * Run only this exercise:  npx vitest run M01
 */
export function longestUniqueSubstring(s) {
  const array = s.split("");
  const substringMap = { };
  let longestSubstringFound = 0;

  for(let i = 0; i < array.length; i++){
    substringMap[i] = array[i];
    let count = 1;
    for(let j = i + 1; j < array.length; j++){
      if(substringMap[i].includes(array[j])){
        break;
      }
      else {
        substringMap[i] = substringMap[i] + array[j];
        count++;
      }
    }
    if (count > longestSubstringFound){
      longestSubstringFound = count;
    }
  }
  return longestSubstringFound;
}


console.log(longestUniqueSubstring("dvdf"))
console.log(longestUniqueSubstring("xyzxyzyy"));
console.log(longestUniqueSubstring("abba"))
