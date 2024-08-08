import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach( function(to,from,next){
  console.log("Route changing!")

  //ovo je dobro ako hocemo da ogranicimo nekog korisnika da pristupi necemu,
  //mozda neku proveru da radimo, ////KORISNO ZA PROJEKAT
  return next()
})

export default router
