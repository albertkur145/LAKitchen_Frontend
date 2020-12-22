<template>
  <div id="header">
    <div class="title">LA' Kitchen - Messenger</div>
    <font-awesome-icon icon="power-off" class="logout-icon"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #header {
    display: flex;
    align-items: center;
    background-color: #E1F4FF;
    justify-content: space-between;
    padding: 0.75rem 1rem;

    .title {
      color: #0F61AD;
      font-weight: 500;
      font-style: italic;
      text-transform: uppercase;
      font-size: 1em;
    }

    .logout-icon {
      color: #888;
      cursor: pointer;
      transition: color .1s linear;
      font-size: 1em;

      &:hover {
        color: #FF505A;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #header {
      padding: 0.75rem 1.25rem;

      .title {
        font-size: 1.0625em;
      }

      .logout-icon {
        font-size: 1.0625em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #header {
      padding: 0.875rem 1.5rem;

      .title {
        font-size: 1.125em;
      }

      .logout-icon {
        font-size: 1.125em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #header {
      padding: 0.875rem 1.5rem;

      .title {
        font-size: 1.125em;
      }

      .logout-icon {
        font-size: 1.125em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>
