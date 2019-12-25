<template lang="html">
<div class="show-table-head">
   <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ShowTableHead'
}
</script>

<style lang="scss">
.show-table-head{
   display: inline-block;
   width: 100%;
   padding: 10px;
   font-size: 12px;
   color: #dcdcdc;
   border-radius: 6px;
   background-color: $body-color;

   @for $i from 1 through 12 {
      .col-xs-#{$i}{
        padding: 5px 10px;
     }
   }
}
</style>
