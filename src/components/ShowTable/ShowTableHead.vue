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
   padding: 0 20px;
   font-size: 12px;
   color: #dcdcdc;

   @for $i from 1 through 12 {
      .col-xs-#{$i}{
        padding: 5px 10px;
     }
   }
}
</style>
