import { derived, writable, readable } from "svelte/store"
import type { AverageColor, Song } from "./global"

export const access_token = writable('')
export const refresh_token = writable('')
export const isPlaying = writable(true)
export const averageColor = writable<AverageColor>({})

export const client_id = readable('cfe906f9b6a143d2b8ae6c67e086d8d1')
export const client_secret = readable('7a99bc3276f543199a21fc0d2140a79c')
export const response_type = readable('code')
export const redirect_uri = readable('http://192.168.0.83:3000/callback')
export const scope = readable('user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state')

export const loggedIn = derived(access_token, ($access_token) => !!$access_token)