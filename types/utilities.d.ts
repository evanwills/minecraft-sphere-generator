import { ICoodinatesBase } from "./minecraft-sphere.d";
/**
 * Make the first leter in a string upper case
 *
 * @param input String to be update
 * @returns
 */
export declare const ucFirst: (input: string) => string;
/**
 * Make sure a number is positive so it can be compared with a
 * known positive number
 *
 * @param input user supplied number
 *
 * @returns positive version of that number
 */
export declare const makePos: (input: number) => number;
export declare const normalise: (input: string) => string;
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
export declare const coordStr: (coordinates: ICoodinatesBase) => string;
