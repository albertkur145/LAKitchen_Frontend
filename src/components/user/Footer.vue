<template>
  <b-row class="footer">
    <b-col md="8" cols="12" class="column">
      <div class="title"><span>{{ title }}</span></div>
      <div class="description">{{ description }}</div>
    </b-col>

    <b-col md="4" cols="12" class="column">
      <div class="title"><span>Contact Us</span></div>
      <div class="description">
        <div class="mb-2">
          <font-awesome-icon icon="tty" class="mr-1"/>
          <span class="ml-2">(021) 7753212</span>
        </div>

        <div class="mb-2">
          <font-awesome-icon icon="envelope" class="mr-1"/>
          <span class="ml-2">lakitchencor@kitchen.co.id</span>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&display=swap');

  // global css
  .footer {
    font-family: 'Dancing Script';
    color: #FFF;
    background-color: #3E342D;
    max-width: 100%;
    margin: 0;
    padding: 1.375rem 0.875rem;

    .column:last-child {
      margin-top: 1.5rem;
    }

    .title {
      font-weight: 700;
      font-size: 1.5em;

      span {
        border-bottom: 0.0625rem solid #FFF;
      }
    }

    .description {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 300;
      margin-top: 0.75rem;
      font-size: 0.75em;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .footer {

      .title {
        font-size: 1.5875em;
      }

      .description {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .footer {
      padding: 1.5rem 1rem;

      .title {
        font-size: 1.75em;
      }

      .description {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .footer {
      padding: 1.5rem;

      .column:last-child {
        margin-top: 0;
      }

      .title {
        font-size: 1.75em;
      }

      .description {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .footer {
      padding: 1.875rem;

      .column:last-child {
        margin-top: 0;
      }

      .title {
        font-size: 2.5em;
      }

      .description {
        font-size: 1em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  data() {
    return {
      title: 'About Us',
      description: 'LA Kitchen adalah sebuah usaha pre-order makanan yang memiliki berbagai jenis tipe makanan dari yang berat hingga makanan ringan. Pada mulanya usaha ini diawali dengan seseorang yang hobi memasak dan menginginkan orang turut merasakan kenikmatan makanan yang dibuatnya. Hingga pada akhirnya terbentuklah LA Kitchen.',
    };
  },

};

</script>
