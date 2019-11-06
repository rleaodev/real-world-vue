<template>
  <div>
    <h1>Events Listing for - {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="totalEvents > eventsPerPage">
      <router-link
        v-show="page > 1"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev</router-link
      >&nbsp;
      <router-link
        v-show="totalEvents > eventsPerPage * page"
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

export default {
  data() {
    return {
      eventsPerPage: 3
    };
  },
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch("event/fetchEvents", {
      perPage: this.eventsPerPage,
      page: this.page
    });
  },
  computed: {
    ...mapState(["event", "user"]),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    totalEvents() {
      return this.event.totalEvents;
    }
  }
};
</script>
