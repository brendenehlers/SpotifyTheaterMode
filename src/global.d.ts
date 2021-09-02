/// <reference types="@sveltejs/kit" />
export interface Song {
  id: string
  name: string
  artist: string
  img: string
}

export interface AverageColor {
  hex?: string
  hexa?: string
  isDark?: boolean
  isLight?: boolean
  rgb?: string
  rgba?: string
  value?: number[]
}