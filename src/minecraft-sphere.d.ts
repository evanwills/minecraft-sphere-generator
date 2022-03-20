
/// <reference types="vite/client" />

export interface IBlockType {
  /** Minecraft Block type identifier */
  id: string,
  /** Human readable label for block type */
  label: string,
  /** Normalised version of block type label to make matching easier */
  norm: string
}

export interface IWarnings {
  general: Array<string>,
  radius: Array<string>,
  x: string,
  y: string,
  z: string,
  thickness: string
}

export interface ICoodinates {
  x: number,
  y: number,
  z: number|string
}

export interface IOneOffCmds {
  first: Array<string>,
  last: Array<string>,
  end: string
}

export interface IRotation {
  horizontal: number,
  vertical: number
}

export type FHandler = (e: Event) => void;
