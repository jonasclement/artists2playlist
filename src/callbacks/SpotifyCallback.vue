<template>
  <p>Working...</p>
</template>

<script>
import { spotifyReturn } from "@/api/spotify-helper";

export default {
  name: "SpotifyCallback",
  mounted() {
    const params = new URLSearchParams(this.$route.hash.substring(1));
    const state = params.get("state");
    const token = params.get("access_token");
    const expiresIn = params.get("expires_in");
    spotifyReturn(state, token, expiresIn);
    this.$router.replace({ name: "Home" });
  }
};
</script>
