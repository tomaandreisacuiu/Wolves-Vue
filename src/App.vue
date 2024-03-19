<template>
  <nav>
    <h1>Wolves Web Application</h1>
    <router-link to="/">Home</router-link> |
    <router-link to="/wolves">Wolves</router-link> |
    <router-link to="/packs">Packs</router-link> |
  </nav>
  <router-view/>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
}

html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #222222
}

nav {
		padding: 30px;
		background-color: 	#3b3b3b;
}

nav a {
		font-weight: bold;
		color: white;
}

nav a.router-link-exact-active {
		color: red;
}
</style>
