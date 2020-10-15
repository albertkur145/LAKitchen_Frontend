const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');

module.exports = {
  'entry': 'index.js',
  plugins: [
    new GoogleFontsPlugin({
      fonts: [
        {
          family: 'Open Sans',
        },
        {
          family: 'Roboto',
          variants: ['100', '400', '500', '700'],
        },
      ],
    }),
  ],
};
