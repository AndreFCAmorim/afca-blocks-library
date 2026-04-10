<?php
/**
 * Breadcrumbs block render template.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#render
 */

if ( ! shortcode_exists( 'rank_math_breadcrumb' ) ) {
	return;
}
?>
<nav <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo do_shortcode( '[rank_math_breadcrumb]' ); ?>
</nav>
