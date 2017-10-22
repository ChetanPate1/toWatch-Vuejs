<template lang="html">
  <div class="container">
     <div class="col-md-offset-4 col-md-4">
        <h1>Sign in</h1>

        <form name="signinForm" novalidate @submit.prevent="login">
          <div class="form-element">
            <label for="email">Email</label>
            <input name="email" type="email" v-model="email" required>
          </div>
          <div class="form-element">
            <label for="password">Password</label>
            <input name="password" type="password" v-model="password" required>
          </div>

          <div class="form-element">
             <button type="submit" class="button pull-right">Sign in</button>
          </div>

          <div class="form-element validation">
            <div class="message" v-bind:class="{ 'show': validation.show }">{{ validation.message }}</div>
          </div>
        </form>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      validation: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    login() {
      console.log('login');
    }
  }
}
</script>

<style lang="css">
</style>
