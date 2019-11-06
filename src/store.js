import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "abc12",
      name: "Rafael"
    },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false }
    ],
    events: [],
    event: {},
    totalEvents: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents;
    },
    SET_EVENT(state, event) {
      state.event = event;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit("SET_EVENTS", response.data);
          commit("SET_TOTAL_EVENTS", response.headers["x-total-count"] || 0);
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
        return true;
      }

      EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    catLength: state => state.categories.length,
    doneTodos: state => state.todos.filter(todo => todo.done),
    activeTodosCount: state => state.todos.filter(todo => !todo.done),
    getEventById: state => id => state.events.find(event => event.id == id),
    getTotalEvents: state => parseInt(state.totalEvents)
  }
});
