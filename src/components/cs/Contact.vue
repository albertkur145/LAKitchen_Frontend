<template>
	<div class="user-contact" @click="$emit('selected', data)">
		<div class="avatar"><font-awesome-icon icon="user"/></div>

    <div class="user-info">
      <div class="name">{{ data.name }}</div>
      <div class="email">{{ data.email }}</div>
    </div>
	</div>
</template>

<style lang="scss" scoped>

  // global css
  .user-contact {
    display: flex;
    cursor: pointer;
    align-items: center;
    transition: background-color .1s ease-out;
    padding: 1rem 1.5rem;

    &:hover {
      background-color: #E2F4FF;
    }
  }

  .avatar {
    color: #AFAFAF;
    font-weight: 500;
    border-radius: 100rem;
    background-color: #F0F0F0;
    padding: 0.6875rem 0.875rem;
    font-size: 0.9375em;
  }

  .user-info {
    margin-left: 1.125rem;

    .name {
      color: #3F3F3F;
      font-weight: 500;
      word-break: break-all;
      font-size: 1em;
    }

    .email {
      color: #AAA;
      word-break: break-all;
      font-size: 0.875em;
    }
  }
  // global css

</style>

<script>

export default {

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

};

</script>
