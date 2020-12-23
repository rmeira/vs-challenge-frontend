<template>
  <v-btn text icon large to="/profile" nuxt class="mr-1">
    <v-avatar size="45" color="elevation-2">
      <v-img :src="avatar" :alt="$auth.user.name"></v-img>
    </v-avatar>
  </v-btn>
</template>

<script>
import avatar from "~/assets/images/avatar.png"

export default {
  data() {
    return {
      avatar,
    }
  },
}
</script>
