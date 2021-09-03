<script lang='ts'>
  export let login: () => void
</script>

<div class='login-container'>
  <button class='login' on:click={login}>
    <img class='login-logo' src='/SpotifyLogo.svg' alt='Spotify Logo'>
    <div class='login-text'>
      Login with Spotify
    </div>
  </button>
</div>

<style>

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
  width: 40%;
  height: 40%;
  min-width: 200px;
  max-width: 500px;
  min-height: 100px;
  max-height: 500px;
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