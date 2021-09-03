<script lang='ts'>
  import { onMount, onDestroy, beforeUpdate } from 'svelte';

  import { api } from '../lib/api'
  import { loggedIn, access_token, refresh_token, isPlaying, client_id, response_type, redirect_uri, scope } from '../store'
  import { getCookie } from '../utils'
  import { delimiter } from '../constants'
 
  import App from '../lib/App/App.svelte'
  import Login from '../lib/Login/Login.svelte'

  const login = () => {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=800,left=100,top=100`
    const loginWin = window.open(`https://accounts.spotify.com/authorize?client_id=${$client_id}&response_type=${$response_type}&redirect_uri=${$redirect_uri}&scope=${$scope}`, '_blank', params)
    loginWin.onbeforeunload = () => {
      window.location.reload()
    }
  }

  // contains the spotify api functions
  let token: string
  const unsubscribe = access_token.subscribe(value => {
    token = value
  })
  let spotify = api(token)

  onMount(() => {
    updateTokens()
  })

  beforeUpdate(async () => {
    updateTokens()
  })

  const updateTokens = () => {
    const tokens = getCookie('tokens').split(delimiter)

    if ($access_token !== tokens?.[0]) {
      const a_token = tokens[0]
      const r_token = tokens[1]
      $access_token = a_token
      $refresh_token = r_token
      spotify = api(token)
    }
  }

  const handleDeleteCookies = () => {
    document.cookie = 'tokens=;'
    window.location.reload()
  }

  const handlePause = () => {
    if ($isPlaying) {
      spotify.pausePlayback()
    } else {
      spotify.playPlayback()      
    }
    $isPlaying = !$isPlaying
  }

  onDestroy(unsubscribe)
</script>


<div class={`app ${!$loggedIn ? 'dark-background' : ''}`}> 
  {#if $loggedIn}
    <!-- allows the user to logout of the app -->
    <!-- <button on:click={handleDeleteCookies} style='position: absolute;'>delete cookies</button> -->
    <App onPause={handlePause} onGetCurrentPlayback={spotify.getCurrentPlayback} />
  {:else}
    <Login login={login} />
  {/if}
</div>

<style>
.dark-background {
  background-color: darkgrey;
}
</style>