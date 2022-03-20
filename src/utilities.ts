
/**
 * Make the first leter in a string upper case
 *
 * @param input String to be update
 * @returns
 */
export const ucFirst = (input : string) : string => {
  const replacer = (match : string, prefix : string, char : string) : string => {
    return prefix + char.toUpperCase();
  }

  return input.replace(/^([^a-z]*)([a-z])/i, replacer);
}

/**
 * Make sure a number is positive so it can be compared with a
 * known positive number
 *
 * @param input user supplied number
 *
 * @returns positive version of that number
 */
  export const makePos = (input : number) : number => {
  return (input < 0)
    ? input *= -1
    : input
}
