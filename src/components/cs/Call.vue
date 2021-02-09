<template>
  <div class="user-calling">
    <span class="username">{{ firstName }} is calling</span>
    <font-awesome-icon @click.once="$emit('receivecall', data.id)"
    icon="check-circle" class="call-icon acc-icon"/>
  </div>
</template>

<style lang="scss" scoped>

  .user-calling {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FFF;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.125rem 0.125rem rgba($color: #000000, $alpha: 0.2);
    margin-bottom: 0.625rem;
    padding: 0.625rem 1.125rem;

    .username {
      font-size: 1.0625em;
      margin-right: 0.75rem;
    }

    .call-icon {
      cursor: pointer;
      font-size: 1.25em;
    }

    .acc-icon {
      color: #20E964;
      margin-right: 0.25rem;
    }

    .denied-icon {
      color: #FF3E49;
    }
  }

</style>

<script>

export default {

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    firstName() {
      return this.data.user.name.split(' ')[0];
    },
  },

};

</script>
