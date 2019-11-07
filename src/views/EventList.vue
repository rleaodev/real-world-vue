<template>
  <div>
    <h1>Events Listing for - {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="event.totalEvents > event.perPage">
      <router-link
        v-show="page > 1"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev</router-link
      >&nbsp;
      <router-link
        v-show="hasNextPage"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="prev"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/store";

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1;
  store
    .dispatch("event/fetchEvents", {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage;
      next();
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  components: {
    EventCard
  },
  computed: {
    ...mapState(["event", "user"]),

    hasNextPage() {
      return this.event.totalEvents > this.page * this.event.perPage;
    }
  }
};
</script>
