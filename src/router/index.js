import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Partner from '../views/partner.vue'
import MeetingDetail from '../views/meetingDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/partner/:meetingId',
      name: 'Partner',
      component: Partner
    },
    {
      path: '/meetingDetail',
      name: 'MeetingDetail',
      component: MeetingDetail
    },
  ]
})