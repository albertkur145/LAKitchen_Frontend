<template>
  <div id="app">
    <img src="@/assets/icons/loader.svg" alt="loader">
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1500;
    background-color: rgba($color: #000000, $alpha: 0.1);

    img {
      width: 7rem;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      img {
        width: 8rem;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      img {
        width: 9rem;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #app {

      img {
        width: 10rem;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      img {
        width: 11rem;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>
