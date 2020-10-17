<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

  body {
    padding: 0;
    margin: 0;

    button {
      border: 0;
      outline: 0 !important;
    }

    #app {
      font-family: 'Roboto';
      background-color: #FCFCFC;
      min-height: 100vh;
    }
  }

</style>
