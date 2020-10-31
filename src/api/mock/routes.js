const API = 'http://localhost:88/api';

export default [
  {
    url: `${API}/categories`,
    method: 'GET',
    status: 200,
    response: {
      code: 200,
      status: 'OK',
      data: {
        categories: [
          {
            id: 1,
            name: 'Bahan Kue',
            photo_link: 'ingredients',
          },
          {
            id: 2,
            name: 'Beras',
            photo_link: 'rice-bowl',
          },
          {
            id: 3,
            name: 'Bumbu & Bahan Masakan',
            photo_link: 'seasoning',
          },
          {
            id: 4,
            name: 'Kopi',
            photo_link: 'coffee',
          },
          {
            id: 5,
            name: 'Kue',
            photo_link: 'cake',
          },
          {
            id: 6,
            name: 'Makanan Beku',
            photo_link: 'steak',
          },
          {
            id: 7,
            name: 'Makanan Jadi',
            photo_link: 'puree',
          },
          {
            id: 8,
            name: 'Makanan Kaleng',
            photo_link: 'can',
          },
          {
            id: 9,
            name: 'Makanan Kering',
            photo_link: 'dried-fruit',
          },
          {
            id: 10,
            name: 'Makanan Ringan',
            photo_link: 'potato-chips',
          },
          {
            id: 11,
            name: 'Makanan Sarapan',
            photo_link: 'cereals',
          },
          {
            id: 12,
            name: 'Mie & Pasta',
            photo_link: 'spaguetti',
          },
        ],
      },
      paging: null,
      errors: null,
    },
  },
  {
    url: `${API}/categoriesandsub`,
    method: 'GET',
    status: 200,
    response: {
      code: 200,
      status: 'OK',
      data: {
        categories: [
          {
            id: 1,
            name: 'Bahan Kue',
            subCategories: [
              {
                id: 1,
                name: 'Bahan Puding & Agar - Agar',
              },
              {
                id: 2,
                name: 'Baking Powder',
              },
              {
                id: 3,
                name: 'Baking Soda',
              },
              {
                id: 4,
                name: 'Coklat Bubuk',
              },
              {
                id: 5,
                name: 'Coklat Masak',
              },
              {
                id: 6,
                name: 'Perisa Makanan',
              },
              {
                id: 7,
                name: 'Pewarna Makanan',
              },
              {
                id: 8,
                name: 'Ragi',
              },
              {
                id: 9,
                name: 'Topping & Penghias Kue',
              },
            ],
          },
          {
            id: 2,
            name: 'Beras',
            subCategories: [
              {
                id: 10,
                name: 'Beras Hitam',
              },
              {
                id: 11,
                name: 'Beras Ketan',
              },
              {
                id: 12,
                name: 'Beras Merah',
              },
              {
                id: 13,
                name: 'Beras Putih',
              },
            ],
          },
          {
            id: 3,
            name: 'Bumbu & Bahan Masakan',
            subCategories: [
              {
                id: 14,
                name: 'Aneka Sambal',
              },
              {
                id: 15,
                name: 'Bawang',
              },
              {
                id: 16,
                name: 'Bumbu Masak Instan',
              },
              {
                id: 17,
                name: 'Cuka',
              },
              {
                id: 18,
                name: 'Garam & Merica',
              },
              {
                id: 19,
                name: 'Gula',
              },
              {
                id: 20,
                name: 'Kaldu & Penyedap Rasa',
              },
              {
                id: 21,
                name: 'Kecap',
              },
              {
                id: 22,
                name: 'Mayonnaise',
              },
              {
                id: 23,
                name: 'Minyak',
              },
              {
                id: 24,
                name: 'Rempah',
              },
              {
                id: 25,
                name: 'Santan',
              },
              {
                id: 26,
                name: 'Saus & Dressing',
              },
              {
                id: 27,
                name: 'Terasi',
              },
            ],
          },
          {
            id: 4,
            name: 'Kopi',
            subCategories: [
              {
                id: 28,
                name: 'Biji Kopi',
              },
              {
                id: 29,
                name: 'Kopi Bubuk',
              },
              {
                id: 30,
                name: 'Kopi Kemasan',
              },
              {
                id: 31,
                name: 'Krimer',
              },
            ],
          },
          {
            id: 5,
            name: 'Kue',
            subCategories: [
              {
                id: 32,
                name: 'Kue Basah',
              },
              {
                id: 33,
                name: 'Kue Kering',
              },
              {
                id: 34,
                name: 'Kue Ulang Tahun',
              },
            ],
          },
          {
            id: 6,
            name: 'Makanan Beku',
            subCategories: [
              {
                id: 35,
                name: 'Bakso',
              },
              {
                id: 36,
                name: 'Buah Beku',
              },
              {
                id: 37,
                name: 'Camilan Beku',
              },
              {
                id: 38,
                name: 'Daging Olahan Lainnya',
              },
              {
                id: 39,
                name: 'Dessert',
              },
              {
                id: 40,
                name: 'Kentang Beku',
              },
              {
                id: 41,
                name: 'Nugget',
              },
              {
                id: 42,
                name: 'Pastry & Olahan Tepung',
              },
              {
                id: 43,
                name: 'Sayuran Beku',
              },
              {
                id: 44,
                name: 'Siomay',
              },
              {
                id: 45,
                name: 'Sosis',
              },
            ],
          },
          {
            id: 7,
            name: 'Makanan Jadi',
            subCategories: [
              {
                id: 46,
                name: 'Buah Olahan',
              },
              {
                id: 47,
                name: 'Lauk Pauk',
              },
              {
                id: 48,
                name: 'Makanan Asin',
              },
              {
                id: 49,
                name: 'Makanan Manis',
              },
              {
                id: 50,
                name: 'Nasi Tumpeng',
              },
              {
                id: 51,
                name: 'Sayur Olahan',
              },
            ],
          },
          {
            id: 8,
            name: 'Makanan Kaleng',
            subCategories: [
              {
                id: 52,
                name: 'Buah Kaleng',
              },
              {
                id: 53,
                name: 'Daging Kaleng',
              },
              {
                id: 54,
                name: 'Ikan Kaleng',
              },
              {
                id: 55,
                name: 'Makanan Instan Kaleng',
              },
            ],
          },
          {
            id: 9,
            name: 'Makanan Kering',
            subCategories: [
              {
                id: 56,
                name: 'Abon',
              },
              {
                id: 57,
                name: 'Bawang Goreng',
              },
              {
                id: 58,
                name: 'Daging Kering & Asin',
              },
              {
                id: 59,
                name: 'Kerupuk',
              },
            ],
          },
          {
            id: 10,
            name: 'Makanan Ringan',
            subCategories: [
              {
                id: 60,
                name: 'Biskuit & Wafer',
              },
              {
                id: 61,
                name: 'Camilan Instant',
              },
              {
                id: 62,
                name: 'Cokelat',
              },
              {
                id: 63,
                name: 'Kacang',
              },
              {
                id: 64,
                name: 'Keripik',
              },
              {
                id: 65,
                name: 'Permen',
              },
              {
                id: 66,
                name: 'Puding & Jelly',
              },
            ],
          },
          {
            id: 11,
            name: 'Makanan Sarapan',
            subCategories: [
              {
                id: 67,
                name: 'Granola',
              },
              {
                id: 68,
                name: 'Meses',
              },
              {
                id: 69,
                name: 'Muesli',
              },
              {
                id: 70,
                name: 'Oat',
              },
              {
                id: 71,
                name: 'Quinoa',
              },
              {
                id: 72,
                name: 'Roti',
              },
              {
                id: 73,
                name: 'Selai',
              },
              {
                id: 74,
                name: 'Sereal',
              },
            ],
          },
          {
            id: 12,
            name: 'Mie & Pasta',
            subCategories: [
              {
                id: 75,
                name: 'Aneka Pasta',
              },
              {
                id: 76,
                name: 'Bihun & Soun',
              },
              {
                id: 77,
                name: 'Kwetiau',
              },
              {
                id: 78,
                name: 'Mie Impor',
              },
              {
                id: 79,
                name: 'Mie Instan',
              },
              {
                id: 80,
                name: 'Mie Telur',
              },
            ],
          },
        ],
      },
      paging: null,
      errors: null,
    },
  },
];
