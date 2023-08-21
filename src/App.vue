<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/ABLine">AB Hor calc Line distance</router-link> |
    <router-link to="/ABMathLine">AB calc Line distance</router-link> |
    <router-link to="/AcBMath">AcB</router-link> |
    <router-link to="/AcBCubicMath">AcBCubicMath</router-link> |
    AcBRectMath
  </nav>
  <div class="app-container">
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.app-container {
  padding-left: 50px;
  /* display: flex;
  justify-content: center;
  max-width: 550px; */
}
/* .center{
  text-align: center;
}
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
} */
</style>
