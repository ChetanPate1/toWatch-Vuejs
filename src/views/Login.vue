<template lang="html">
<div class="container">
   <div class="col-md-offset-4 col-md-4">
      <card>
         <h2>Sign in</h2>

         <form name="signinForm" novalidate @submit.prevent="onLogin">
            <div class="form-element dark">
               <label for="email">Email</label>
               <input name="email" type="email" v-model="form.email" required>
            </div>
            <div class="form-element dark">
               <label for="password">Password</label>
               <input name="password" type="password" v-model="form.password" required>
            </div>

            <div class="row">
               <div class="col-xs-12 text-right">
                  <button type="submit" class="button">Sign in</button>
               </div>
            </div>
         </form>
      </card>
   </div>
</div>
</template>

<script>
import Card from '@/components/Card/Card';
import { mapState } from 'vuex';

export default {
   name: 'Login',
   data() {
      return {
         form: {
            email: '',
            password: ''
         }
      }
   },
   computed: {
      ...mapState({
      token: ({ storage }) => storage.token
    })
   },
   methods: {
      onLogin() {
         this.$store.dispatch('auth/signUserIn', this.form);
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
