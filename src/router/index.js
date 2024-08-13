import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',//ovde ce umesto ovog home da ide nesto drugo!
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/destinations',
    name: 'AllDestinations',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/AllDestinations.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach( function(to,from,next){

  const jwt = localStorage.getItem('jwt');

  if(jwt){
    const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const nesto = JSON.parse(atob(base64));

      Vue.prototype.$user = {
        type: nesto.type,
        status: nesto.status,
        name: nesto.name 
      };
  }

  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt')

    if (!jwt) {
      next({name: 'LoginPage'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'LoginPage'});
      return;
    }
  }

  next();
})

export default router
