import { ICoodinatesBase } from "./minecraft-sphere.d";
/**
 * Make the first leter in a string upper case
 *
 * @param input String to be update
 * @returns
 */
export const ucFirst = (input : string) : string => {
  // @ts-ignore
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

export const normalise = (input : string) : string => {
  return input.replace(/[^a-z0-9 ]+/ig, ' ').toLowerCase().trim();
}



/**
 * Get the coordinates of a specific position as a string that can
 * be used in a Minecraft command
 *
 * @param {ICoodinates} coordinates X, Y, Z coordinates for a
 *                                  specific position
 *
 * @returns {string} String in the format " X Z Y"
 *                  (Note: string includes a leading space)
 */
export const coordStr = (coordinates : ICoodinatesBase) : string => {
  return ' ' + coordinates.x.toString() +
         ' ' + coordinates.z.toString() +
         ' ' + coordinates.y.toString();
}
