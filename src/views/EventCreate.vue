<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        label="Select a category"
        v-model="event.category"
        :options="categories"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />

      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add an event description"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add an event location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Loation is required
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />

        <template v-if="$v.event.date.$error">
          <p v-if="!$v.event.date.required" class="errorMessage">
            Date is required
          </p>
        </template>
      </div>
      <div class="field">
        <BaseSelect
          class="field"
          label="Select a time"
          v-model="event.time"
          :options="times"
          @blur="$v.event.time.$touch()"
          :class="{ error: $v.event.time.$error }"
        />

        <template v-if="$v.event.time.$error">
          <p v-if="!$v.event.time.required" class="errorMessage">
            Time is required
          </p>
        </template>
      </div>
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

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
  validations: {
    event: {
      category: {
        required
      },
      title: {
        required
      },
      description: {
        required
      },
      location: {
        required
      },
      date: {
        required
      },
      time: {
        required
      }
    }
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
