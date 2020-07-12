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
               <button class="forgot-password" type="button" @click="$router.push({ name: 'forgotPassword' })">Forgotten your password?</button>
               <input name="password" type="password" v-model="form.password" required>
            </div>

            <div class="row margin-top-50">
              <div class="col-xs-6">
                 <button type="button" @click="$router.push({ name: 'register' })" class="button ghost">Register</button>
              </div>

               <div class="col-xs-6 text-right">
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
   mounted() {
     const { token } = this.$route.params;

     if(token) {
       this.$store.dispatch('auth/verifyEmail', token);
     }
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

<style lang="scss" scoped>
h2{
   color: #ffffff;
}

.forgot-password {
  position: absolute;
  right: 0;
  bottom: -24px;
  background: transparent;
  border: none;
  color: #5d5d61;
}
</style>
