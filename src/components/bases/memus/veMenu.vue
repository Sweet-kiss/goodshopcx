<template>
  <div class="goodsWrapper">
    <div class="goods">
      <div class="menu_wrapper" ref="menuWrapper">
         <ul>
          <li v-for="(item, index) in goods" :class="{'current':currentIndex===index}" @click="selectMeun(index, $event)">
            <span class="test">
               <span v-show="item.type<0" class="icon"><img :src="'/static/imgs/'+item.iconbiao" alt=""></span>{{item.name}}
            </span>
          </li>
         </ul>
      </div>
      <div class="foods_wrapper" ref="foodsWrapper">
         <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                  <li v-for="food in item.foods" class="food-item">
                     <div class="icon"><img :src="'/static/hotFood/'+food.icon" alt=""></div>
                     <div class="content">
                         <h2 class="name">{{food.name}}</h2>
                         <p class="descount">{{food.description}}</p>
                          <div class="extra">
                            <span>月售：{{food.sellCount}}</span>
                            <span>好评率：{{food.rating}}</span>
                          </div>
                          <span class="money">￥{{food.price}}</span>
                     </div>
                     <div class="cartControl_wrapper"><cart-control :food="food"></cart-control></div>
                     
                  </li>
              </ul>
          </li>
         </ul>
      </div>
    </div>
    <shop-cart :select-foods="selectFoods" :sellers="sellers"></shop-cart>
  </div>

</template>

<script>
import BScroll from 'better-scroll';
import ShopCart from '@/components/shopCart/shopCart'
import CartControl from '@/components/smallParts/cartControl/cartControl'

export default {
  name: 'goods',
  components: {
     ShopCart,
     CartControl
  },  
  props: {
     sellers: Object
  },
  data () {
     return {
        goods: [],
        listHeight: [],
        scrollY: 0
     }
  },
   created () {
    this.$http.get('/api/goods').then((response) => {
       response = response.body
       this.goods = response.data
       console.log(this.goods)
       this.$nextTick(() => {
           this._initScroll()
           this._caculateHeight()
        })
     })   
  },
  methods: {
    _initScroll () {
        this.meunScroll = new BScroll(this.$refs['menuWrapper'],{
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs['foodsWrapper'],{
            click: true,
            probeType: 3
        })
        this.foodsScroll.on('scroll',(pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
        })
    },
    _caculateHeight (){
       let foodList = this.$refs['foodsWrapper'].getElementsByClassName('food-list-hook')
           // console.log(foodList)
       let height = 0
       this.listHeight.push(height)
       for (let i=0; i<foodList.length; i++) {
          let item = foodList[i]
          console.log(item)
          height += item.clientHeight
          this.listHeight.push(height)
        }
     },
    selectMeun (index, event) {
        if(!event._constructed) {
          return
        }
        console.log(index)
        let foodList = this.$refs['foodsWrapper'].getElementsByClassName('food-list-hook')
        let el =  foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
    }
  },
  computed: {
    currentIndex () {
        for (let i=0; i<this.listHeight.length; i++) {
            let height1 = this.listHeight[i]
            let height2 = this.listHeight[i+1]
            if(!height2 || (this.scrollY >= height1&&this.scrollY < height2)){
                return i
            }
        }
        return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
           if(food.count){
              foods.push(food)
           }
        })
      })
      return foods
    }
  }
}
</script>

<style>
.goodsWrapper {
   overflow: hidden;
}
.goods {
    display: flex;
    position: absolute;
    top:170px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
}
.menu_wrapper {
   flex: 0 0 80px;
   width: 80px;
   background: #f3f5f7;
}
.foods_wrapper {
    flex: 1;
}
.menu_wrapper ul li {
    padding: 10px 8px;
    border-bottom: #dadad9 solid 1px;
    font-size: 16px;
    line-height: 30px;
}
.current {
    background-color: #e6f40b;
    color: #fff;
}
.test span {
    display: inline-block;
    float: left;
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin-right: 4px;
}
.test span img {
    width: 100%;
}
.title {
    padding-left: 14px;
    height: 30px;
    line-height: 30px;
    background-color: #faf8dd;
}
.food-item {
    position: relative;
    display: flex;
    padding: 5px 2px;
}
.icon {
    flex: 0 0 100px;
    width: 200px;
    text-align: center;
    margin-right: 5px;
}
.icon img {
    width: 90%;
}
.content h2 {
    font-size: 20px;
    font-weight: bold;
}
.content {
    flex: 1;
}
.descount {
    font-size: 13px;
    color:#767675;
    padding: 3px;
    line-height: 16px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
}
.extra span {
    font-size: 13px;
    color:#767675;
    margin-right: 10px;
}
.money {
    display: block;
    font-size: 22px;
    color:red;
    padding-top: 10px;
    font-family: "微软雅黑"
}
.cartControl_wrapper {
  position: absolute;
  bottom: 5px;
  right: 17px;
}
</style>
