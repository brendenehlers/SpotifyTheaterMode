// implied type better than I could ever do
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const api = (access_token: string) => {
  const url = 'https://api.spotify.com/v1/me/player'
  const params: RequestInit = {
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const getPlayer = async (): Promise<Record<string, any>> => {
    const res = await fetch(url, params)
    const player = await res.json()
    return player
  }
  
  const getCurrentPlayback = async (): Promise<Record<string, any>> => {
    const res = await fetch(url + '/currently-playing', params)
    const playback = await res.json()
    return playback  
  }
  
  const pausePlayback = (): void => {
    params.method = 'PUT'
    fetch(url + '/pause', params)
  }

  const playPlayback = (): void => {
    params.method = 'PUT'
    fetch(url + '/play', params)
  }

  return {getPlayer, getCurrentPlayback, pausePlayback, playPlayback}
}
