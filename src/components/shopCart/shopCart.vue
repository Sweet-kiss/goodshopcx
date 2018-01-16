<template>
  <div class="shopCart">
    <div class="content-left" @click="toggleList">
       <div class="contShop_class">
           <div class="shopClassWrapper"><span :class="{choseShop: totalCount>0}"></span></div>
           <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
       </div>
       <div class="Price_wrapper">
          <span class="totalPrice" :class="{priceGl: totalCount>0}">￥{{totalPrice}}</span>
          <span class="dis_fee">另需配送费￥{{sellers.deliveryPrice}}元</span>
       </div>
    </div>
    <div class="content-right" :class="{caulateGl: totalCount>0}">
       <span class="purchase">{{payDec}}</span>
    </div>
    <div class="ball-container">
       <div class="ball" transition="drop" v-for="ball in balls" v-show="ball.show">
          <div class="inner"></div>
       </div>
    </div>
    <div class="shopcart-list" v-show="listShow">
         <div class="list-header">
           <span class="title">购物车</span>
           <span class="empty" @click="empty">清空</span>
         </div>
         <div class="list-content" ref="listContent">
           <ul>
             <li class="food" v-for="food in selectFoods">
               <div class="foodMessage">
                 <span class="name">{{food.name}}</span>
                 <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                 </div>
               </div>
                 <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                 </div>
             </li>
           </ul>
         </div>
    </div>
    <div class="list-mask" v-show="listShow"></div>
  </div>

</template>

<script>
import BScroll from 'better-scroll';
import CartControl from '@/components/smallParts/cartControl/cartControl'

export default {
  name: 'shopCart',
  components: {
     CartControl
  },  
  props: {
    sellers: {},
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array
    }
  },
  data(){
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }         
      ],
      fold: true
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
         total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
         count += food.count
      })
      return count
    },
    payDec () {
      if(this.totalPrice === 0) {
         return '￥'+this.sellers.minPrice+'元起送'
      } else if(this.totalPrice<this.sellers.minPrice){
        let diff = this.sellers.minPrice - this.totalPrice
        return '还差'+diff+'元起送'
      } else {
        return '去结算'
      }
    },
    listShow () {
      if(!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if(!this.scroll) {
             this.scroll = new BScroll(this.$refs['listContent'],{
                click: true
             }) 
           } else {
              this.scroll.refresh()
           }
        })
      }
      return show
    }
  },
  methods: {
    toggleList () {
       if (!this.totalCount) {
          return
       }

       this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
         food.count = 0
      })
    }
  }
}
</script>

<style>
.shopCart {
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  background-color: #616262;
  z-index: 1;
}
.list-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #5a5a59;
  z-index: -1;
  opacity: 0.8;
}
.content-left {
  flex: 1;
  display: flex;
  width: 100%;
}
.contShop_class {
  position: relative;
  flex: 0 0 80px;
  width: 80px;
  background-color: #616262;
}
.totalCount {
  position: absolute;
  left: 50px;
  top:-15px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: red;
  color: #fff;
  border-radius: 50%;
  z-index: 101;
}
.shopClassWrapper {
  position: absolute;
  top:-20px;
  left: 13px;
  width: 60px;
  height: 60px;
  background-color: #616262;
  border-radius: 50%;
}
.shopClassWrapper span {
  position: absolute;
  left: 7px;
  top: 7px;
  display: block;
  width: 48px;
  height: 48px;
  background-color: #3b3b3b;
  border-radius: 50%;
  background-image: url("./img/shopClass.png");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: 7px 10px;
  z-index: 100;
}
.choseShop {
  background-color: #fcd10b !important;
  background-image: url("./img/shopClass2.png") !important;
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: 7px 10px;
}

.content-right {
  flex: 0 0 100px;
  padding: 0px 5px;
  height: 46px;
  line-height: 46px;
  font-size: 17px;
  text-align: center;
  color: #e3e3e3;
}
.Price_wrapper span:first-child {
  display: inline-block;
  float: left;
  padding: 0px 5px;
  height: 46px;
  line-height: 46px;
  color: #aeafaf;
  font-size: 22px;
}
.priceGl {
  color: #fff !important;
  font-weight: blod;
}
.Price_wrapper span:nth-child(2) {
   display: inline-block;
   float: left;
   padding: 0px 5px;
   height: 46px;
   line-height: 46px;
   color: #aeafaf;
   font-size: 15px;
}
.caulateGl {
  color:red;
  background-color: yellow;
}
.ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200
}
.drop-transition {
  transition: all 0.4s;
}
.inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(242, 245, 9);
  transition: all 0.4s;
}
.shopcart-list {
  position: absolute;
  left: 0;
  bottom:45px;
  z-index: 2;
  width: 100%;
}
.list-header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #f2f509;
}
.list-header {
  display: flex;
}
.title {
  flex: 1;
  display: inline-block;
  background:none;
  height: 40px;
  line-height: 40px;
}
.empty {
  flex: 0 0 50px;
}
.list-content {
  background-color: #fff;
  max-height: 200px;
  overflow: hidden;
  padding: 10px 10px;
}
.food {
  display: flex;
}
.foodMessage {
  flex: 1;
  display: flex;
  padding: 18px 0px;
}
.name {
  flex: 1;
}
.price {
  flex: 0 0 80px;
  color: red;
}
.cartcontrol-wrapper {
  flex: 0 0 90px;
  padding: 10px 0px; 
}
</style>
