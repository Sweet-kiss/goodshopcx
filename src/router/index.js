import Vue from 'vue'
import Router from 'vue-router'
import GoodsWrap from '@/components/goodsWrap'
import VueResource from 'vue-resource'
import resetcss from '@/assets/reset/reset.css'
import VeMenu from '@/components/bases/memus/veMenu'
import VeComponent from '@/components/bases/components/veComponents'
import VeBuiness from '@/components/bases/vebuiness/veBuiness'

Vue.use(VueResource)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsWrap',
      component: GoodsWrap,
      children: [
        {
	      path: '/goodsWrap/veMenu',
	      name: 'VeMenu',
	      component: VeMenu
        },
        {
	      path: '/goodsWrap/veComponets',
	      name: 'VeComponent',
	      component: VeComponent        	
        },
        {
	      path: '/goodsWrap/veBuiness',
	      name: 'VeBuiness',
	      component: VeBuiness         	
        }
      ]
    }
  ]
})
