<template>
  <div>
    <template v-if="$auth.$state.loggedIn">
      <div>{{$auth.$state.user.name}}</div>
    </template>
    <template v-else>
      <div>No user</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
