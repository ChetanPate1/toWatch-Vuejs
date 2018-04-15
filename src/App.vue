<template>
   <div id="app">
      <navigation-bar></navigation-bar>
      <router-view/>
   </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar/NavigationBar';

export default {
   name: 'app',
   components: {
      NavigationBar
   }
}
</script>

<style src="./style/main.scss" lang="scss"></style>
