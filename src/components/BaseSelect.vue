<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :Value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option></option>
      <option
        v-for="option in options"
        :key="option"
        :selected="option == value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin";
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
