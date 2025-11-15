# AFCA Blocks Library

A collection of custom Gutenberg blocks for WordPress.

## Description
AFCA Blocks Library is a WordPress plugin that bundles multiple custom Gutenberg blocks into a single, easy-to-manage library.

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
