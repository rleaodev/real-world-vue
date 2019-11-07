import Vue from "vue";
import Router from "vue-router";
import EventCreate from "./views/EventCreate.vue";
import EventList from "./views/EventList.vue";
import EventShow from "./views/EventShow.vue";
import NotFound from "./views/NotFound.vue";
import NetworkIssue from "./views/NetworkIssue.vue";
import NProgress from "nprogress";
import store from "@/store/store";

Vue.use(Router);

/*
  When we us vue router, we earn three more Lifecycle hooks:

  beforeRouteEnter(routeTo, routeFrom, next) - Called before is created (doesnt exists this)
  beforeRouteUpdate(routeTo, routeFrom, next) - Compoentns already created - access this
  beforeRouteLeave(routeTo, routeFrom, next) - Compoentns already created - access this

  next is callback
  next() | next(true) = routeto is called
  next(false) = will be in the same component
  next('/') = will redirect to '/'
  next({name: 'event-list'}) - will redirect to named route event-list

  example:

  beforeRouteLeave(routeTo, routeFrom, next) {
      const answer = window.confirm(
        'Do you really want to leave? You have unsaved changes!'
      )
      if (answer) {
        next() // <-- Confirms the navigation
      } else {
        next(false) // <-- Cancels the navigation
      }
    },


  We also have the Global Routing Guards.

    They are called from the router object and runs before navigating to a component. And de NEXT() MUST BE CALLED

    With global routigin guards we have 2 more lifecycle hooks: beforeEach and afterEach, so this is the step by step for routing guards

    1. beforeEach
    2. beforeRouteEnter
    3. afterEach
    4. beforeCreate | created


    beforeEnter is called only when the components is created
    
*/

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true,
      beforeEnter(to, from, next) {
        store
          .dispatch("event/fetchEvent", to.params.id)
          .then(event => {
            to.params.event = event;
            next();
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({
                name: "404",
                params: {
                  resource: "event"
                }
              });
            } else {
              next({ name: "network-issue" });
            }
          });
      }
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue,
      props: true
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      props: true
    },
    {
      path: "*",
      redirect: {
        name: "404"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
