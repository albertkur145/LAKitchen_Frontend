import Swal from 'sweetalert2';

export default {
  promiseAPI(action, params = null) {
    return new Promise((resolve) => {
      action({
        resolve,
        params,
      });
    });
  },

  pathUser() {
    return [
      {
        icon: 'id-card-alt',
        name: 'Profil',
        route: '/profile',
      },
      {
        icon: 'heart',
        name: 'Wishlist',
        route: '/wishlist',
      },
      {
        icon: 'box-tissue',
        name: 'Daftar Pesanan',
        route: '/order',
      },
      {
        icon: 'cogs',
        name: 'Ganti Password',
        route: '/',
      },
    ];
  },

  popupConnectionError() {
    Swal.fire({
      icon: 'question',
      text: 'Koneksimu masih hidup?',
      showCloseButton: true,
      confirmButtonText: 'Kembali',
    }).then(() => {
      window.history.back();
    });
  },

  popupError(text, confirmButtonText) {
    Swal.fire({
      icon: 'error',
      text,
      showCloseButton: true,
      confirmButtonText,
    });
  },

  popupSuccessNoRoute(text) {
    Swal.fire({
      icon: 'success',
      text,
      timer: 5000,
      showCloseButton: true,
      confirmButtonText: 'OK',
    });
  },
};
