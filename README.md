# AFCA Blocks Library

A collection of custom Gutenberg blocks for WordPress.

## Description
AFCA Blocks Library is a WordPress plugin that bundles multiple custom Gutenberg blocks into a single, easy-to-manage library.

## Blocks
1. Link Group Block, allows to have a block wrapped by a hyperlink that allows to have inner blocks.
2. Meta Field Block, returns a meta value stored on wp_postmeta.
3. Query With Template Part Block, allows to have template parts in the default Query Loop Block.
4. Swiper Slider Block, allows to have a slider with swiper js.

## Installation
1. Clone or download this repository into your `wp-content/plugins/` folder.
2. Run `npm install`.
3. Run `npm run build` to generate the production build.
4. Activate **AFCA Blocks Library** in your WordPress admin.

## Development
Use `npm run start` to start the build watcher.

## Translations
- All PHP translations load via `load_plugin_textdomain()`.
- All JS (block editor) translations load via `wp_set_script_translations()`.
- To generate POT and JSON files:
  ```bash
  wp i18n make-pot . languages/afca-blocks-library.pot
  wp i18n make-json languages/
  ```

## License
GPL-2.0-or-later
