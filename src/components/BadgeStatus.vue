<template>
  <span :class="['badge', status ? 'badge-success' : 'badge-danger']">
    {{ status ? "Disponible" : "Ocupado" }}
  </span>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25em 0.4em;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}

.badge-success {
  color: #fff;
  background-color: #28a745;
}

.badge-danger {
  color: #fff;
  background-color: #dc3545;
}
</style>
