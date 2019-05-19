<template>
  <div id="app">
    <Toast>
      <navigation-bar></navigation-bar>
      <router-view/>
    </Toast>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Toast from "./components/Toast/Toast";

export default {
  name: "app",
  components: {
    NavigationBar,
    Toast
  }
};
</script>

<style src="./style/main.scss" lang="scss"></style>
