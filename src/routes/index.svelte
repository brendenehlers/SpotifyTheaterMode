<script lang='ts'>
  import { onMount, onDestroy, beforeUpdate } from 'svelte';

  import { api } from '../lib/api'
  import { loggedIn, access_token, refresh_token, isPlaying, client_id, response_type, redirect_uri, scope } from '../store'
  import { getCookie } from '../utils'
  import { delimiter } from '../constants'
 
  import App from '../lib/App/App.svelte'

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
    <div class='login-container'>
      <button class='login' on:click={login}>
        <img class='login-logo' src='/SpotifyLogo.svg' alt='Spotify Logo'>
        <div class='login-text'>
          Login with Spotify
        </div>
      </button>
  </div>
  {/if}
</div>

<style>
.dark-background {
  background-color: darkgrey;
}
.login-container {
	display: flex;
	justify-content: center;
	align-content: center;
	height: 100vh;
}
.login {
	/* TODO make this look nicer */
  border: none;
	display: flex;
	width: 25%;
	height: 40%;
	align-self: center;
	justify-self: center;
	/* align-content: space-around;*/
	justify-content: center; 
  align-items: center;

	border-radius: 10px;
	box-shadow: 2px 2px 15px 0px rgba(0,0,0,0.8);
	background-color: white;

	font-weight: 600;
	font-size: 24px;
}
.login-logo {
  width: 64px;
  height: 64px;
  margin-right: 10px;
}
.login-text {
	justify-self: center;
	align-self: center;
	font-weight: inherit;
	font-size: inherit;
	color: rgb(63, 63, 63);
}
.login:hover {
	color: white;
	text-decoration: none;
	background-color: rgb(230, 230, 230);
  cursor: pointer;
}
</style>