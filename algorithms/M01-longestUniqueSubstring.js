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
export function longestUniqueSubstringSlow(s) {
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


export function longestUniqueSubstring(s) {
  const ventana = new Set();
  let izq = 0;
  let maximo = 0;

  for (let der = 0; der < s.length; der++) {
    while (ventana.has(s[der])) {
      ventana.delete(s[izq]);
      izq++;
    }

    ventana.add(s[der]);
    maximo = Math.max(maximo, der - izq + 1);
  }
  return maximo;
}

// [d,v,d,f]
// d   j

console.log(longestUniqueSubstring("dvdf"))
console.log(longestUniqueSubstring("xyzxyzyy"));
console.log(longestUniqueSubstring("abba"))
