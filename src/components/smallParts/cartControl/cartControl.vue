<template>
  <div class="cartControl">
     <div class="cart-decress" v-show="food.count>0" @click="decreaseCart" transition="move"><span class="inner">-</span></div>
     <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
     <div class="cart-add" @click="addCart"><span>+</span></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'cartControl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if(!event._constructed){
        return
      }
       console.log("mm")
       if(!this.food.count) {
          Vue.set(this.food,'count',1)
       } else {
         this.food.count ++
       }
    },
    decreaseCart (event) {
      if(!event._constructed) {
        return
      }
      console.log("jjj")
      if(this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style>
.cart-decress,.cart-count,.cart-add {
  display: inline-block;
}
.cart-decress span,.cart-add span {
  display: block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background-color: yellow;
  text-align: center;
  font-size: 24px;
  border-radius: 50%;
}
.cart-count {
  padding: 0px 8px;
}
.cart-add span {
  font-size: 20px;
}
</style>
