<?php
/**
 * Plugin Name: AFCA Blocks Library
 * Plugin URI: https://andreamorim.site/plugin-documentation/afca-blocks-library/
 * Description: A collection of custom Gutenberg blocks for WordPress: Rank Math Breadcrumbs, Shortcode for Template Parts, Link Group, Meta Field, Share Post Socials and Swiper Slider.
 * Requires at least: 6.8
 * Requires PHP:      8.0
 * Author: André Amorim
 * Author URI: https://andreamorim.site
 * Version: 2.0
 * Text Domain: afca-blocks-library
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Require composer autoload for psr-4
 */
if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

use Afca\Blocks\Library\Init;

add_action(
	'init',
	function() {
		$plugin_path = plugin_dir_path( __FILE__ );
		$plugin_data = get_plugin_data( $plugin_path . 'afca-blocks-library.php' );

		new Init(
			$plugin_path,
			plugin_dir_url( __FILE__ ),
			$plugin_data['Version']
		);
	}
);
