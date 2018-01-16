<template>
  <div class="hello">
    <v-top :sellers="sellers"></v-top>
    <div class="tab">
        <router-link class="tab-item " :to="{ path: '/goodsWrap/veMenu'}">点菜<span></span></router-link>
        <router-link class="tab-item " :to="{ path: '/goodsWrap/veComponets'}">评价<span></span></router-link>
       <router-link class="tab-item " :to="{ path: '/goodsWrap/veBuiness'}">商家<span></span></router-link>
    </div>
    <router-view :sellers="sellers"></router-view>
  </div>
</template>

<script>
import VTop from '@/components/vheader/vheader'

export default {
  name: 'goodsWrap',
  components: {
     VTop
  },
  data () {
    return {
      sellers: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
       response = response.body
       this.sellers = response.data
       console.log(this.sellers)
     })
  }
}
</script>

<style scoped>
.tab {
  display: flex;
  height: 40px;
  border-bottom: #cbcbcb solid 1px;
}
.tab-item {
  flex: 1;
  text-align: center;
  height: 36px;
  line-height: 36px;
  color: #000;
  font-weight: lighter;
 }
.router-link-active {
  display: block;
  color: #000;
  height: 36px;
  line-height: 36px;
  color: red;
  font-weight: lighter;
}
 .router-link-active>span {
    display: block;
    width: 25%;
    margin: 0 auto;
    color: #fc5706;
    height: 2px;
    border-bottom: 2px solid #fc5706;
    font-weight: lighter;
 }
</style>
