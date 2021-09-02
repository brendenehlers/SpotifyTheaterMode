<script lang="ts">
  import { onMount } from 'svelte'

  import { client_id, client_secret } from '../store'
  import { delimiter } from '../constants'

  onMount(() => {
    const args = new URLSearchParams(window.location.search)
    const code = args.get('code')
    document.cookie = ''

    const authorize = async (code) => {
      if (code !== 'access_denied') {
        const newParams = new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'http://192.168.0.83:3000/callback'
        })
        const params: RequestInit = {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa($client_id + ':' + $client_secret)
          },
          body: newParams
        }
        const res = await fetch('https://accounts.spotify.com/api/token', params)
        if (res.status === 200) {
          const data = await res.json()
          console.log(data)
          const d = new Date()
          d.setTime(d.getTime() + data.expires_in*1000)
          // put both tokens in one cookie
          document.cookie = `tokens=${data.access_token}${delimiter}${data.refresh_token}; expires=${d.toUTCString()}; path=/;`
          // 
          setTimeout(() => refreshToken(data.refresh_token), data.expires_in * 999)
        }
      }
      window.close()
    }

    const refreshToken = async (refresh_token: string) => {
      const args = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      })
      const params = {
        method: 'POST',
        body: args
      }
      const res = await fetch('https://accounts.spotify.com/api/token', params)
      if(res.status === 200) {
        const data = await res.json()
        const d = new Date()
        d.setTime(d.getTime() + data.expires_in*1000)
        // put both tokens in one cookie
        document.cookie = `tokens=${data.access_token}${delimiter}${refresh_token}; expires=${d.toUTCString()}; path=/;`
      }
    }

    authorize(code)
  })
</script>

<h1>Please wait</h1>
<p>Logging you in....</p>