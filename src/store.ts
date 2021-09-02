import { derived, writable, readable } from "svelte/store"
const c_id = import.meta.env.VITE_CLIENT_ID
const c_secret = import.meta.env.VITE_CLIENT_SECRET

import type { AverageColor } from "./global"

export const access_token = writable('')
export const refresh_token = writable('')
export const isPlaying = writable(true)
export const averageColor = writable<AverageColor>({})

export const client_id = readable(c_id)
export const client_secret = readable(c_secret)
export const response_type = readable('code')
export const redirect_uri = readable('http://192.168.0.83:3000/callback')
export const scope = readable('user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state')

export const loggedIn = derived(access_token, ($access_token) => !!$access_token)