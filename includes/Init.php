<?php

namespace Afca\Blocks\Library;

class Init {

	private $plugin_path;
	private $plugin_url;
	private $plugin_version;

	public function __construct($path, $url, $version) {
		$this->plugin_path = $path;
		$this->plugin_url  = $url;
		$this->plugin_version = $version;
		$this->init_blocks();
		$this->load_js_translations();
		$this->load_updates_checker();
	}

	private function load_updates_checker() {
		// Load WP Code Plugin Functions
		if ( ! function_exists( 'get_plugin_data' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$update_class = new Updates( 'https://andreamorim.site/', basename( $this->plugin_path ), $this->plugin_version );

		// Schedule task for checking updates
		add_action( 'afca_blocks_library_updates', [ $update_class, 'check_for_updates_on_hub' ] );
		if ( ! wp_next_scheduled( 'afca_blocks_library_updates' ) ) {
			wp_schedule_event( current_time( 'timestamp' ), 'daily', 'afca_blocks_library_updates' );
		}
	}

	/**
	 * Translations for JS
	 */
	private function load_js_translations() {
		wp_set_script_translations(
			'afca-blocks-library-editor-script',
			'afca-blocks-library',
			$this->plugin_path . 'languages'
		);
	}

	/**
	 * Init blocks
	 */
	private function init_blocks() {
		register_block_type( $this->plugin_path . 'build/link-group-block' );
		register_block_type( $this->plugin_path . 'build/meta-field-block' );
		//register_block_type( $this->plugin_path . 'build/query-with-template-part-block' );
		register_block_type( $this->plugin_path . 'build/share-post-block' );
		register_block_type( $this->plugin_path . 'build/swiper-slider-block' );
	}
}
