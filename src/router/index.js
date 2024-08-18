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
  },
  {
    path: '/articles',
    name: 'AllArticles',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/AllArticles.vue')
  },{
    path: '/articles/destiantion/:destinationName',
    name: 'ArticleByDestination',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/ArticleByDestination.vue')
  },
  {
    path: '/destination/edit/:destinationId',
    name: 'EditDestination',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/EditDestination.vue')
  },
  {
    path: '/users',
    name: 'AllUsers',
    meta:{
      authRequired: true,
    },
    component: () => import('../views/AllUsers.vue')
  },
  {
    path: '/users/edit/:userId',
    name: 'EditUser',
    meta:{
      authRequired: true,
    },
    component: () => import('../views/EditUser.vue')
  },
  {
    path: '/destination/addNew',
    name: 'AddDestination',
    meta:{
      authRequired: true,
    },
    component: () => import('../views/AddDestination.vue')
  },
  {
    path: '/user/addNew',
    name: 'AddNewUser',
    meta:{
      authRequired: true,
    },
    component: () => import('../views/AddNewUser.vue')
  },
  {
    path: '/article/edit/:articleId',
    name: 'EditArticle',
    meta:{
      authRequired: true,
    },
    component: () => import('../views/EditArticle.vue')
  },
  {
    path: '/article/addNew',
    name: 'AddNewArticle',
    meta:{
      authRequired: true,
    },
    component: () => import('../views/AddNewArticle.vue')
  },
  {
    path: '/mostPopular',
    name: 'MostPopular',
    component: () => import('../views/MostPopular.vue')
  },
  {
    path: '/articleByDestination/:destinationName',
    name: 'ArtByDestName',
    component: () => import('../views/ArtByDestName.vue')
  },
  {
    path: '/article/:articleId',
    name: 'ArticleDetails',
    component: () => import('../views/ArticleDetails.vue')
  },
  {
    path: '/alldestinations',
    name: 'AllHomeDestinations',
    component: () => import('../views/AllHomeDestinations.vue')
  },
  {
    path: '/articles/activity/:activityId',
    name: 'ArticlesByActivity',
    component: () => import('../views/ArticlesByActivity.vue')
  },
  
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
      alert("You are unotorized for that action!")
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
