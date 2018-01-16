<template>
  <div class="headerWrap">
    <div class="topMain">
       <div class="shopSign_img"><span><img :src="'/static/imgs/'+sellers.shopImg" alt=""></span></div>
       <div class="mohuBg"></div>
       <div class="shop_text">
          <h2>{{sellers.name}}</h2>
          <p>{{sellers.notice}}</p>
          <div class="labelItems">
            <span><em><img :src="'/static/imgs/'+sellers.commentIcon" alt=""></em>{{sellers.labelOne}}</span>
            <span>{{sellers.labelTwo}}</span>
            <span>{{sellers.labelThree}}</span>
          </div>
       </div>

    </div>
   <div class="discount"> 
          <p><span>减</span><span>{{sellers.discountedInfo}}</span></p>
       </div>
  </div>
</template>

<script>
export default {
  name: 'headerWrap',
  props: {
     sellers: {}
  }
}
</script>

<style>
.topMain {
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
 overflow: hidden;
}
.mohuBg {
  position: absolute;
  width: 100%;
  height: 100px;
  top:0;
  left: 0;
  background-image: url('./imgs/shopBg.jpg');
  background-size: cover;
  -webkit-filter: blur(4px);
  -moz-filter: blur(4px);
  o-filter: blur(4px);
  -ms-filter: blur(4px);
  filter: blur(4px);
  overflow: hidden;
  z-index: -1;
}
.shopSign_img {
  width: 100px;
  text-align: center;
}
.shopSign_img span {
  display: block;
  width: 80px;
  height: 70px;
  margin: 20px auto 0px auto;
  overflow: hidden;
}
.shopSign_img span img {
  width: 100%;
  height: 100%;
}
.shop_text {
  flex: 1;
}
.shop_text h2 {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 10px;
} 
.shop_text p {
  font-size: 10px;
  color: #f4f7ad;
  width: 250px;
  margin-bottom: 10px;
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.discount {
  height: 30px;
  line-height: 30px;
} 
.discount span:first-child {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  font-size: 10px;
  color: #fff;
  background-color: red;
  margin-left: 10px;
  margin-right: 5px;
}
.discount span:nth-child(2) {
  font-size: 11px;
  color: #525352;
}
.labelItems span {
  display: inline-block;
  padding: 3px 5px;
  font-size: 10px;
  margin-right: 5px;
  border: #ecf335 solid 0.5px;
  color: #ecf335;
  border-radius: 4px;
}
.labelItems span:first-child em {
  display: inline-block;
  float: left;
  margin-right: 2px;
  width: 13px;
  height: 13px;
  overflow: hidden;
}
.labelItems span:first-child em img {
  width: 100%;
  height: 100%;
}
</style>
