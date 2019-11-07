import EventService from "@/services/EventService";

export const namespaced = true;
export const state = {
  todos: [
    { id: 1, text: "...", done: true },
    { id: 2, text: "...", done: false },
    { id: 3, text: "...", done: true },
    { id: 4, text: "...", done: false }
  ],
  events: [],
  event: {},
  totalEvents: 0
};

export const mutations = {
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
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Event has been created"
        };

        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem saving event " + error.message
        };

        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENTS", response.data);
        commit("SET_TOTAL_EVENTS", response.headers["x-total-count"] || 0);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events " + error.message
        };

        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
        })
        .catch(error => {
          const notification = {
            type: "error",
            message: "There was a problem fetching event " + error.message
          };

          dispatch("notification/add", notification, { root: true });
        });
    }
  }
};
export const getters = {
  doneTodos: state => state.todos.filter(todo => todo.done),
  activeTodosCount: state => state.todos.filter(todo => !todo.done),
  getEventById: state => id => state.events.find(event => event.id == id),
  getTotalEvents: state => parseInt(state.totalEvents)
};
