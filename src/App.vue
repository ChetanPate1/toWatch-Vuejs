<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';

export default {
  name: 'app',
  components: {
    NavigationBar
  }
}
</script>

<style lang="css">
body{
  font-family: 'Nunito', sans-serif;
}

h1{
  margin-bottom: 30px;
  font-size: 60px;
  font-weight: bold;
}

button{
  position: relative;
}

#app{
  padding-top: 150px;
  padding-bottom: 150px;
  min-height: 500px;

  @media(max-width: 991px){
      padding-top: 70px;
  }
}
</style>
