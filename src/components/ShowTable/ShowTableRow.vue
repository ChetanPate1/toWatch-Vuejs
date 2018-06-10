<template lang="html">
<div class="show-table-row">
   <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ShowTableRow'
}
</script>

<style lang="scss">
.show-table-row{
   display: inline-block;
   width: 100%;
   background-color: #ffffff;
   border-radius: 6px;
   padding: 8px 20px;
   margin-bottom: 10px;
   box-shadow: 0 8px 40px -10px rgba(0, 0, 0, 0.2);
   
   @for $i from 1 through 12 {
      .col-xs-#{$i}{
        padding: 10px;
     }
   }
}

</style>
