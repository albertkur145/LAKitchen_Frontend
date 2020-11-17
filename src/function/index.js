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

  popupConnectionError(back = true) {
    Swal.fire({
      icon: 'question',
      text: 'Koneksimu masih hidup?',
      showCloseButton: true,
      confirmButtonText: 'Kembali',
    }).then(() => {
      if (back) {
        window.history.back();
      }
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

  popupLoginFirst(html) {
    Swal.fire({
      icon: 'info',
      html,
      showCloseButton: true,
      confirmButtonText: 'Siap',
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

  popupSuccess(text, router, path) {
    Swal.fire({
      icon: 'success',
      text,
      timer: 5000,
      showCloseButton: true,
      confirmButtonText: 'OK',
    }).then(() => {
      router.push(path);
    });
  },

  popupConfirmAction(text, confirmButtonText, cancelButtonText) {
    const result = Swal.fire({
      icon: 'info',
      html: text,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      focusCancel: true,
    }).then((res) => res.isConfirmed);

    return result;
  },
};
