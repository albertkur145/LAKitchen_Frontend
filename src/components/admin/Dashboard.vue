<template>
  <div>
    <div class="header">
      <div class="title">Beranda</div>
      <div>
        <font-awesome-icon icon="sign-out-alt" class="logout-icon"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .header {
    display: flex;
    align-items: center;
    background-color: #FFF;
    justify-content: space-between;
    padding: 1rem 1.25rem;

    .title {
      color: #555;
      font-weight: 600;
      font-size: 1.125em;
    }

    .logout-icon {
      color: #444;
      cursor: pointer;
      font-size: 1.25em;
    }
  }

</style>

<script>

export default {

};

</script>
