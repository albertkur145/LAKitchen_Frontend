<template>
  <div id="root">
    <router-view/>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,500&display=swap');

  body {
    padding: 0;
    margin: 0;

    button {
      border: 0;
      outline: 0 !important;
    }

    #root {
      font-family: 'Roboto';
      background-color: #FAFAFA;
    }
  }

</style>
