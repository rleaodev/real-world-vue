<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="getTotalEvents > eventsPerPage">
      <router-link
        v-show="page > 1"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev</router-link
      >&nbsp;
      <router-link
        v-show="getTotalEvents > eventsPerPage * page"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="prev"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState, mapGetters } from "vuex";

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
    this.$store.dispatch("fetchEvents", {
      perPage: this.eventsPerPage,
      page: this.page
    });
  },
  computed: {
    ...mapState(["events"]),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapGetters(["getTotalEvents"])
  }
};
</script>
