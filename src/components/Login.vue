<template lang="html">
<div class="container">
   <div class="col-md-offset-4 col-md-4">
      <card>
         <h2>Sign in</h2>

         <form name="signinForm" novalidate @submit.prevent="onLogin">
            <div class="form-element dark">
               <label for="email">Email</label>
               <input name="email" type="email" v-model="email" required>
            </div>
            <div class="form-element dark">
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
      </card>
   </div>
</div>
</template>

<script>
import Card from './Card/Card';

export default {
   name: 'Login',
   data() {
      return {
         email: '',
         password: ''
      }
   },
   mounted() {
      if (this.getToken()) {
         this.$router.push('my-shows');
      }
   },
   methods: {
      onLogin() {
         this.$store.dispatch('auth/signUserIn', {
            email: this.email, password: this.password
         });
      },
      getToken() {
         const token = localStorage.getItem('token');

         if (!token || token == 'null') {
            return null;
         }
         
         return token;
      }
   },
   components: {
      Card
   }
}
</script>

<style lang="scss" scoped="true">
h2{
   color: #ffffff;
}
</style>
