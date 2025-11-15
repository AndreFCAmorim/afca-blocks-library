/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, registerBlockVariation } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit,

	/**
	 * @see ./save.js
	 */
	save,
});

/**
 * Register all variations from the block.json.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/
 */
metadata.variations.forEach((variation) => {
	registerBlockVariation("afca-blocks/swiper-slider", {
		name: variation.name,
		title: variation.title,
		icon: variation.icon,
		scope: variation.scope,
		isDefault: variation.isDefault,
		attributes: variation.attributes,
	});
});

