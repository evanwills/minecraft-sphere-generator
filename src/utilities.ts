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

/**
 * Get multiplier value for rounding number
 *
 * @param places Number of decimal places number needs to be
 *               rounded to
 *
 * @returns A value that a number can be multiplied by before
 *          rounding then devided by after rounding to get the right
 *          number of decimal places.
 */
const _getPlaces = (places: number) : number => {
  return (places === 0)
    ? 1
    : Math.pow(10, places);
}

/**
 * Round number up to required number of decimal places
 *
 * @param input  Number to be rounded up
 * @param places Decimal places to round to
 *
 * @returns rounded number
 */
export const ceil =(input : number, places : number = 0) : number => {
  const _places = _getPlaces(places);

  console.group('ceil(' + input + ', ' + places + ')')
  console.log('_places:', _places)
  console.log('(input * _places):', (input * _places))
  console.log('(input * _places) % 1:', (input * _places) % 1)
  console.log('(((input * _places) % 1) > 0):', (((input * _places) % 1) > 0))
  console.log('(Math.ceil(input * _places)  / _places):', (Math.ceil(input * _places)  / _places))
  console.groupEnd()

  return (Math.ceil(input * _places)  / _places);
}

/**
 * Round number down to required number of decimal places
 *
 * @param input  Number to be rounded up
 * @param places Decimal places to round to
 *
 * @returns rounded number
 */
export const floor =(input : number, places : number = 0) : number => {
  const _places = _getPlaces(places);

  console.group('floor(' + input + ', ' + places + ')')
  console.log('_places:', _places)
  console.log('(input * _places):', (input * _places))
  console.log('(input * _places) % 1:', (input * _places) % 1)
  console.log('(((input * _places) % 1) > 0):', (((input * _places) % 1) > 0))
  console.log('(Math.ceil(input * _places)  / _places):', (Math.ceil(input * _places)  / _places))
  console.groupEnd()

  return (Math.floor(input * _places)  / _places);
}

/**
 * Round number to required number of decimal places
 *
 * @param input  Number to be rounded up
 * @param places Decimal places to round to
 *
 * @returns rounded number
 */
export const round =(input : number, places : number = 0) : number => {
  const _places = _getPlaces(places);

  console.group('round(' + input + ', ' + places + ')')
  console.log('_places:', _places)
  console.log('(input * _places):', (input * _places))
  console.log('(input * _places) % 1:', (input * _places) % 1)
  console.log('(((input * _places) % 1) > 0):', (((input * _places) % 1) > 0))
  console.log('(Math.ceil(input * _places)  / _places):', (Math.ceil(input * _places)  / _places))
  console.groupEnd()

  return (Math.round(input * _places)  / _places);
}
