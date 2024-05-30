<template>
  <span :class="['badgeCapacity', 'badge-capacity']"> Capacidad: {{ capacity }} </span>
</template>

<script>
export default {
  props: {
    capacity: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.badgeCapacity {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
.badge-capacity {
  color: #fff;
  background-color: rgb(122, 122, 247);
}
.badge-danger {
  color: #fff;
  background-color: #dc3545;
}
</style>
