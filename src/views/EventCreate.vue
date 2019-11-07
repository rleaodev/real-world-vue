<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        label="Select a category"
        v-model="event.category"
        :options="categories"
        value
      />
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
        class="field"
      />
      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add an event description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add an event location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <BaseSelect
          class="field"
          label="Select a time"
          v-model="event.time"
          :options="times"
          value
        />
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      event: this.createFreshEventObject()
    };
  },
  computed: {
    ...mapGetters(["event/getEventById"]),
    ...mapState(["user", "categories"])
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id,
        user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    },
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: {
              id: this.event.id
            }
          });
          this.event = this.createFreshEventObject;
        })
        .catch(err => {
          console.log(err);
          NProgress.done();
        });
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
