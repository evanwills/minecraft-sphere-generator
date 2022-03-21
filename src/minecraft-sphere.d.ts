
/// <reference types="vite/client" />

export interface IBlockType {
  /** Minecraft Block type identifier */
  id: string,
  /** Human readable label for block type */
  label: string,
  /**
   * Normalised version of block type label to make matching easier
   * String is converted to all lowercase & has all non-alpha numeric
   * characters removed and replace
   */
  norm: string
}

export interface IWarnings {
  /** List of all errors/warnings identified by parsing current values */
  general: Array<string>,
  /** List of errors related to radius of object */
  radius: Array<string>,
  x: string,
  /** error related Y (North/South) axis coordinate */
  y: string,
  /** error related Z (Up/Down) axis coordinate */
  z: string,
  /** Error related to thickness of object */
  thickness: string
}

export interface ICoodinates {
  /** X (East/West) axis coordinate */
  x: number,
  /** Y (North/South) axis coordinate */
  y: number,
  /** Z (Up/Down) axis coordinate */
  z: number|string
}

export interface IOneOffCmds {
  /** Commands to be executed before main build starts */
  first: Array<string>,
  /** Commands to be executed at the end of the build */
  last: Array<string>,
  /** If/Else statement to identify when building should stop */
  end: string
}

export interface IRotation {
  /** Angle of horizontal rotation */
  horizontal: number,
  /** Angle of vertical rotation */
  vertical: number
}

export interface ICmdReturn {
  /** Output command or comment */
  output: string,
  /**
   * Chain string to prepend to block type next time a command block
   * is chained
   */
  chain: string,
  /**
   * The number by which the command count needs to be incremented
   * (either 0 or 1)
   */
  count: number
}

export type FHandler = (e: Event) => void;
