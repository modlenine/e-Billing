import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/vender/Home.vue'
import Homeadmin from '@/views/admin/Home.vue'
import Uploadpage from '@/views/admin/Uploadpage.vue'
import Validatebilled from '@/views/admin/Billedlist.vue'
import Validatebilled2 from '@/views/admin/Validatebilled.vue'
import Settingpage from '@/views/admin/Settingpage.vue'
import Announcepage from '@/views/admin/Announce.vue'
import Reportbilledadmin from '@/views/admin/Reportbilled.vue'
import Reportbilledsumadmin from '@/views/admin/Reportbilledsum.vue'
import Settinguser from '@/views/admin/Settinguser.vue'

import Activate from '@/views/vender/Activate.vue'
import ResultActivate from '@/views/vender/ResultActivate.vue'
import Billing from '@/views/vender/Billingpage.vue'
import Selectbilling from '@/views/vender/Selectbillingpage.vue'
import Billedlist from '@/views/vender/Billedlist.vue'
import ValidateBilled from '@/views/vender/ValidateBilled.vue'
import Reportbilled from '@/views/vender/Reportbilled.vue'
import Userprofile from '@/views/vender/Userprofile.vue'
import WaitActivate from '@/views/vender/WaitActivate.vue'
import EditemailActivate from '@/views/vender/EditemailActivate.vue'
import Forgotpassword from '@/views/vender/Forgotpassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Homeadmin',
    component: Homeadmin
  },
  {
    path: '/admin/uploadpage',
    name: 'Uploadpage',
    component: Uploadpage
  },
  {
    path:'/admin/validatebilled',
    name:'Validatebilled',
    component:Validatebilled
  },
  {
    path:'/admin/confirmbilled/:formno/:taxid',
    name:'Validatebilled2',
    component:Validatebilled2,
    props:true
  },
  {
    path:'/admin/setting',
    name:'Settingpage',
    component:Settingpage
  },
  {
    path:'/admin/settinguser',
    name:'Settinguser',
    component:Settinguser
  },
  {
    path:'/admin/announce',
    name:'Announcepage',
    component:Announcepage
  },
  {
    path:'/admin/reportbilled',
    name:'Reportbilledadmin',
    component:Reportbilledadmin
  },
  {
    path:'/admin/reportbilledsum',
    name:'Reportbilledsumadmin',
    component:Reportbilledsumadmin
  },
  {
    path: '/activate/:id/:code',
    name: 'Activate',
    component : Activate
  },
  {
    path: '/result_activate/:resultid/:link',
    name: 'ResultActivate',
    component : ResultActivate
  },
  {
    path: '/waitactivate/:waittaxid',
    name: 'WaitActivate',
    component : WaitActivate
  },
  {
    path: '/forgotpassword/:number',
    name: 'Forgotpassword',
    component : Forgotpassword
  },
  {
    path: '/resetpassword/:r_taxid/:r_tokencode',
    name: 'Forgotpassword',
    component : Forgotpassword
  },
  {
    path: '/editemailactivate/:edittaxid',
    name: 'EditemailActivate',
    component : EditemailActivate
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing
  },
  {
    path: '/selectbilling/:venderaccount/:dataareaid/:payment',
    name: 'Selectbilling',
    component: Selectbilling ,
    props: true,
  },
  {
    path:'/billedlist',
    name:'Billedlist',
    component: Billedlist
  },
  {
    path:'/ValidateBilled/:formno',
    name:'ValidateBilled',
    component:ValidateBilled,
    props:true
  },
  {
    path:'/reportbilled',
    name:Reportbilled,
    component:Reportbilled,
    props:true
  },
  {
    path:'/userprofile',
    name:Userprofile,
    component:Userprofile,
    props:true
  }

  // {
  //   path:'/viewdata/:id',
  //   name:'Viewdata',
  //   component:Viewdata
  // },
  // {
  //   path:'/edit/:id',
  //   name:'Edit',
  //   component:Edit,
  // },

  // {
  //   path: '/list',
  //   name: 'List',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/List.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
