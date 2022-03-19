
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
  z: string
}


export type FHandler = (e: Event) => void;
