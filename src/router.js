import Vue from "vue";
import Router from "vue-router";
import EventCreate from "./views/EventCreate.vue";
import EventList from "./views/EventList.vue";
import EventShow from "./views/EventShow.vue";

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
    
*/

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate
    }
  ]
});
