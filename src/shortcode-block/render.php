<?php
/**
 * Shortcode block render template.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#render
 */

$shortcode = isset( $attributes['shortcode'] ) ? trim( $attributes['shortcode'] ) : '';

if ( empty( $shortcode ) ) {
	return;
}

// Basic validation: must start with [ and end with ]
if ( ! preg_match( '/^\[.+\]$/', $shortcode ) ) {
	return;
}
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo do_shortcode( $shortcode ); ?>
</div>
