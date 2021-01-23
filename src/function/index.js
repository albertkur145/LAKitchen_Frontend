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
        name: 'Ganti Kata Sandi',
        route: '/changepassword',
      },
    ];
  },

  removeStorages(cookies) {
    cookies.remove('token');
    cookies.remove('user');
    localStorage.removeItem('isStartConversation');
    localStorage.removeItem('cart');
  },

  isLoggedIn(cookies, redirect = true, router = null, path = '/login', role = 'user') {
    if (!cookies.get('token') || !cookies.get(role)) {
      if (redirect) {
        router.push(path);
      }

      return false;
    }

    return true;
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

  popupErrorRedirect(text, confirmButtonText, router, path) {
    Swal.fire({
      icon: 'error',
      text,
      showCloseButton: true,
      confirmButtonText,
    }).then(() => {
      router.push(path);
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

  popupSuccessNoRoute(text, refresh = false) {
    Swal.fire({
      icon: 'success',
      text,
      timer: 5000,
      showCloseButton: true,
      confirmButtonText: 'OK',
    }).then(() => {
      if (refresh) {
        window.location.reload();
      }
    });
  },

  popupSuccess(text, router, path) {
    Swal.fire({
      icon: 'success',
      html: text,
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
      reverseButtons: true,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      focusCancel: true,
    }).then((res) => res.isConfirmed);

    return result;
  },

  formTextArea(label, placeholder, value) {
    const result = Swal.fire({
      input: 'textarea',
      title: label,
      inputPlaceholder: placeholder,
      reverseButtons: true,
      confirmButtonText: 'Simpan',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      inputValue: value,
    }).then((res) => res);

    return result;
  },

  popupInfo(text) {
    return Swal.fire({
      icon: 'info',
      html: text,
      timer: 5000,
      showCloseButton: true,
      confirmButtonText: 'OK',
    });
  },

  popupInfoWithBack(text, router) {
    return Swal.fire({
      icon: 'info',
      html: text,
      timer: 5000,
      showCloseButton: true,
      confirmButtonText: 'OK',
    }).then(() => {
      router.go(-1);
    });
  },
};
