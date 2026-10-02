/**
 * E01 — Capitalize Words   (statement: Practice PDF, Part A)
 *
 * Complete the 'capitalizeWords' function below.
 *
 * The function is expected to return: STRING
 * The function accepts the following parameters:
 *  1. STRING sentence
 *
 * Run only this exercise:  npx vitest run E01
 */
export function capitalizeWords(sentence) {
  let newWord = false

  return sentence.split("").map((item, i) => {
    if (item === " ") newWord = true;
    else if (newWord || i === 0) {
      newWord = false;
      item = item.toUpperCase();
    }
    else item = item.toLowerCase();
    return item;
  }).join("")
}

// export function capitalizeWordsTwo(str) {
//   return str.split(" ").map(word => 
//     word.charAt(0).toUpperCase() + word.slice(1)
//   ).join(" ");
// }
