import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
import beforeEach from '@/router/beforeEach'

Vue.use(Router)

const router = new Router({ routes, linkActiveClass: 'active' })

router.beforeEach(beforeEach)

export default router
