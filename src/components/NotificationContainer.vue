<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    ></NotificationBar>
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    NotificationBar
  },
  computed: mapState("notification", ["notifications"])
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
}
</style>
