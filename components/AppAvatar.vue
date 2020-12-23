<template>
  <v-avatar :size="size" color="elevation-1">
    <v-img :src="avatar"></v-img>
  </v-avatar>
</template>

<script>
import avatar from "~/assets/images/avatar.png"

export default {
  props: {
    size: {
      type: Number,
      default: 30,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      avatar,
    }
  },
}
</script>

<style></style>
