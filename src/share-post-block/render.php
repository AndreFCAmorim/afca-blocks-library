<?php
/**
 * Share Post Block - Server-side render.
 *
 * @package AfcaBlocksLibrary
 */

$enabled_networks = $attributes['enabledNetworks'] ?? [ 'facebook', 'linkedin', 'whatsapp', 'email', 'twitter' ];
$icon_size        = isset( $attributes['iconSize'] ) ? absint( $attributes['iconSize'] ) : 24;
$icon_style       = $attributes['iconStyle'] ?? 'filled';
$icon_spacing     = isset( $attributes['iconSpacing'] ) ? absint( $attributes['iconSpacing'] ) : 8;
$open_in_new_tab  = ! empty( $attributes['openInNewTab'] );
$show_label       = ! empty( $attributes['showLabel'] );
$label_text       = $attributes['labelText'] ?? 'Share:';
$alignment        = $attributes['alignment'] ?? 'left';
$post_id          = $block->context['postId'] ?? get_the_ID();
$custom_icon_color   = ! empty( $attributes['iconColor'] ) ? sanitize_hex_color( $attributes['iconColor'] ) : '';
$custom_icon_bg      = ! empty( $attributes['iconBgColor'] ) ? sanitize_hex_color( $attributes['iconBgColor'] ) : '';

// Retrieve post data.
$post_url   = rawurlencode( get_permalink( $post_id ) );
$post_title = rawurlencode( get_the_title( $post_id ) );

// Network brand colors.
$network_colors = [
	'facebook'  => '#1877F2',
	'linkedin'  => '#0A66C2',
	'twitter'   => '#000000',
	'whatsapp'  => '#25D366',
	'pinterest' => '#E60023',
	'telegram'  => '#2AABEE',
	'email'     => '#6B7280',
];

// Network share URLs.
$share_urls = [
	'facebook'  => 'https://www.facebook.com/sharer/sharer.php?u=' . $post_url,
	'linkedin'  => 'https://www.linkedin.com/sharing/share-offsite/?url=' . $post_url,
	'twitter'   => 'https://twitter.com/intent/tweet?url=' . $post_url . '&text=' . $post_title,
	'whatsapp'  => 'https://api.whatsapp.com/send?text=' . $post_title . '%20' . $post_url,
	'pinterest'  => 'https://pinterest.com/pin/create/button/?url=' . $post_url . '&description=' . $post_title,
	'telegram'  => 'https://t.me/share/url?url=' . $post_url . '&text=' . $post_title,
	'email'     => 'mailto:?subject=' . $post_title . '&body=' . $post_url,
];

// Network labels.
$network_labels = [
	'facebook'  => __( 'Share on Facebook', 'afca-blocks-library' ),
	'linkedin'  => __( 'Share on LinkedIn', 'afca-blocks-library' ),
	'twitter'   => __( 'Share on X (Twitter)', 'afca-blocks-library' ),
	'whatsapp'  => __( 'Share on WhatsApp', 'afca-blocks-library' ),
	'pinterest'  => __( 'Share on Pinterest', 'afca-blocks-library' ),
	'telegram'  => __( 'Share on Telegram', 'afca-blocks-library' ),
	'email'     => __( 'Share via Email', 'afca-blocks-library' ),
];

// SVG icons (inline).
$svg_icons = [
	'facebook' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.49 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>',
	'linkedin' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
	'twitter'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
	'whatsapp' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
	'pinterest' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>',
	'telegram' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
	'email'    => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
];

// Compute padding for the icon wrapper based on style.
$padding = ( 'minimal' === $icon_style ) ? 0 : round( $icon_size * 0.35 );

// Build icons HTML.
$icons_html = '';
foreach ( $enabled_networks as $network_id ) {
	if ( ! isset( $svg_icons[ $network_id ] ) ) {
		continue;
	}

	$share_url = $share_urls[ $network_id ] ?? '';
	$label     = $network_labels[ $network_id ] ?? $network_id;
	$color     = $network_colors[ $network_id ] ?? '#333';

	// Compute icon fill color and background.
	if ( 'filled' === $icon_style ) {
		$svg_fill   = $custom_icon_color ?: '#ffffff';
		$bg_style   = 'background:' . esc_attr( $custom_icon_bg ?: $color ) . ';';
		$border_style = '';
	} elseif ( 'outlined' === $icon_style ) {
		$svg_fill   = $custom_icon_color ?: $color;
		$bg_style   = 'background:' . esc_attr( $custom_icon_bg ?: 'transparent' ) . ';';
		$border_style = 'border:2px solid ' . esc_attr( $custom_icon_color ?: $color ) . ';';
	} else { // minimal
		$svg_fill   = $custom_icon_color ?: $color;
		$bg_style   = 'background:' . esc_attr( $custom_icon_bg ?: 'transparent' ) . ';';
		$border_style = '';
	}

	// Replace SVG fill with the correct color.
	$svg = str_replace( '<path', '<path fill="' . esc_attr( $svg_fill ) . '"', $svg_icons[ $network_id ] );

	$border_radius = ( 'minimal' !== $icon_style ) ? 'border-radius:50%;' : '';

	$icon_inner_style = sprintf(
		'display:inline-flex;align-items:center;justify-content:center;%s%s%spadding:%dpx;',
		$bg_style,
		$border_style,
		$border_radius,
		$padding
	);

	$svg = sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%1$d" viewBox="0 0 24 24">%2$s</svg>',
		$icon_size,
		// Extract the inner path element.
		preg_replace( '/<svg[^>]*>(.*?)<\/svg>/s', '$1', $svg_icons[ $network_id ] )
			? preg_replace( '/<path/', '<path fill="' . esc_attr( $svg_fill ) . '"', preg_replace( '/<svg[^>]*>|<\/svg>/', '', $svg_icons[ $network_id ] ) )
			: ''
	);

	$target = $open_in_new_tab ? '_blank' : '_self';
	$rel    = $open_in_new_tab ? ' rel="noopener noreferrer"' : '';

	$icons_html .= sprintf(
		'<a href="%1$s" class="afca-share-icon afca-share-icon--%2$s afca-share-icon--%3$s" aria-label="%4$s" target="%5$s"%6$s style="%7$s">%8$s</a>',
		esc_url( $share_url ),
		esc_attr( $network_id ),
		esc_attr( $icon_style ),
		esc_attr( $label ),
		esc_attr( $target ),
		$rel,
		esc_attr( $icon_inner_style ),
		$svg
	);
}

// Label HTML.
$label_html = '';
if ( $show_label && $label_text ) {
	$label_html = sprintf(
		'<span class="afca-share-label">%s</span>',
		esc_html( $label_text )
	);
}

$wrapper_attributes = get_block_wrapper_attributes();

$icons_wrapper = sprintf(
	'<div class="afca-share-icons" style="display:flex;flex-wrap:wrap;align-items:center;gap:%dpx;">%s</div>',
	$icon_spacing,
	$icons_html
);

printf(
	'<div %s>%s%s</div>',
	$wrapper_attributes,
	$label_html,
	$icons_wrapper
);
