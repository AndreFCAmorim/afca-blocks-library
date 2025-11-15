<?php
/**
 * Plugin Name: AFCA Blocks Library
 * Description: A collection of custom Gutenberg blocks for WordPress.
 * Requires at least: 6.8
 * Requires PHP:      8.0
 * Author: André Amorim
 * Version: 1.0
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
