import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	useBlockProps,
	__experimentalBlockVariationPicker as BlockVariationPicker,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { icons } from "./icons/index.js";
import DefaultSliderControls from "./controls-default.js";
import MosaicGalleryControls from "./controls-mosaic-gallery.js";
import metadata from "./block.json";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function edit(props) {
	const {
		mosaicGallery,
		slidesPerView,
	} = props.attributes;

	if (mosaicGallery === true) {
		const { blocksCount, blocks } = useSelect((select) => ({
			blocksCount: select("core/block-editor").getBlockCount(props.clientId),
			blocks: select("core/block-editor").getBlocks(props.clientId),
		}));

		// Use the blocks data
		useEffect(() => {
			let fourthImageRadius;
			let secondImageRadius;
			let firstImageRadius;

			if (blocksCount > 1) {
				const blocksAttributes = blocks[0].attributes;

				if (blocksAttributes.style !== undefined) {
					const styleObject = blocksAttributes.style;
					if (styleObject.hasOwnProperty("border")) {
						const borderObject = styleObject.border;
						if (borderObject.hasOwnProperty("radius")) {
							firstImageRadius = borderObject.radius;
						}
					}
				}
			}
			if (blocksCount > 2) {
				const blocksAttributes = blocks[1].attributes;

				if (blocksAttributes.style !== undefined) {
					const styleObject = blocksAttributes.style;
					if (styleObject.hasOwnProperty("border")) {
						const borderObject = styleObject.border;
						if (borderObject.hasOwnProperty("radius")) {
							secondImageRadius = borderObject.radius;
						}
					}
				}
			}
			if (blocksCount > 4) {
				const blocksAttributes = blocks[3].attributes;

				if (blocksAttributes.style !== undefined) {
					const styleObject = blocksAttributes.style;
					if (styleObject.hasOwnProperty("border")) {
						const borderObject = styleObject.border;
						if (borderObject.hasOwnProperty("radius")) {
							fourthImageRadius = borderObject.radius;
						}
					}
				}
			}

			props.setAttributes({
				itemsCount: blocksCount,
				smallCountRadius:
					blocksCount > 1 && firstImageRadius !== undefined
						? firstImageRadius
						: "8px",
				mediumCountRadius:
					blocksCount > 2 && secondImageRadius !== undefined
						? secondImageRadius
						: "8px",
				largeCountRadius:
					blocksCount > 4 && fourthImageRadius !== undefined
						? fourthImageRadius
						: "8px",
				slidesPerView: blocksCount <= 4 ? blocksCount : slidesPerView,
			});
		}, [blocksCount, blocks]);
	}

	return (
		<div {...useBlockProps}>
			{mosaicGallery === null && (
				<BlockVariationPicker
					variations={metadata.variations}
					label={__("Slider variations", "afca-blocks-library")}
					instructions={__(
						"Choose the variation to use",
						"afca-blocks-library"
					)}
					onSelect={(variation) =>
						props.setAttributes({
							mosaicGallery: variation.attributes.mosaicGallery.default,
						})
					}
				/>
			)}

			{mosaicGallery === false && (
				<>
					<DefaultSliderControls {...props} />
					<DefaultSlider
						props
						pagination
						navigation
						arrowIconsBackgroundColor
						arrowIconsBorderRadius
						arrowIconsBorderColor
						arrowIconsBorderWidth
						arrowIconsColor
						scrollBar
						allowFullScreen
						fullScreenCloseButtonColor
					/>
				</>
			)}
			{mosaicGallery === true && (
				<>
					<MosaicGalleryControls {...props} />
					<MosaicGallery
						arrowIconsBackgroundColor
						arrowIconsBorderRadius
						arrowIconsBorderColor
						arrowIconsBorderWidth
						arrowIconsColor
						fullScreenCloseButtonColor
					/>
				</>
			)}
		</div>
	);
}

function DefaultSlider(
	props,
	pagination,
	navigation,
	arrowIconsBackgroundColor,
	arrowIconsBorderRadius,
	arrowIconsBorderColor,
	arrowIconsBorderWidth,
	arrowIconsColor,
	scrollBar,
	allowFullScreen,
	fullScreenCloseButtonColor
) {
	return (
		<>
			<div className="afca-blocks-library" {...props.attributes}>
				<div className="swiper">
					<div className="block-slider-normal">
						<div className="swiper-wrapper">
							<InnerBlocks
								allowedBlocks={["core/cover"]}
								template={[["core/cover"]]}
							/>
						</div>

						<div className="afca-blocks-library__pagination">
							{pagination && <div className="swiper-pagination"></div>}
						</div>

						<div className="afca-blocks-library__navigation">
							{navigation && (
								<>
									<div
										className="swiper-button-prev"
										style={{
											backgroundColor: arrowIconsBackgroundColor,
											borderRadius: arrowIconsBorderRadius,
											borderColor: arrowIconsBorderColor,
											borderWidth: arrowIconsBorderWidth,
										}}
									>
										{icons.leftArrow(arrowIconsColor)}
									</div>
									<div
										className="swiper-button-next"
										style={{
											backgroundColor: arrowIconsBackgroundColor,
											borderRadius: arrowIconsBorderRadius,
											borderColor: arrowIconsBorderColor,
											borderWidth: arrowIconsBorderWidth,
										}}
									>
										{icons.rightArrow(arrowIconsColor)}
									</div>
								</>
							)}
						</div>

						<div className="afca-blocks-library__scrollbar">
							{scrollBar && <div className="swiper-scrollbar"></div>}
						</div>
					</div>
				</div>
				{allowFullScreen && (
					<>
						<div id="fullscreen-swiper"></div>
						<div id="fullscreen-swiper-backdrop"></div>
						<div id="fullscreen-swiper-icon-close" style={{ display: "none" }}>
							{icons.close(fullScreenCloseButtonColor)}
						</div>
					</>
				)}
			</div>
		</>
	);
}

function MosaicGallery(
	arrowIconsBackgroundColor,
	arrowIconsBorderRadius,
	arrowIconsBorderColor,
	arrowIconsBorderWidth,
	arrowIconsColor,
	fullScreenCloseButtonColor
) {
	return (
		<>
			<div className="afca-blocks-library">
				<div className="swiper">
					<div className="block-slider-normal">
						<div className="swiper-wrapper">
							<InnerBlocks
								allowedBlocks={["core/image"]}
								template={[["core/image"]]}
							/>
						</div>
					</div>
				</div>
				<div id="fullscreen-swiper">
					<div className="afca-blocks-library__pagination">
						<div className="swiper-pagination"></div>
					</div>

					<div className="afca-blocks-library__navigation">
						<div
							className="swiper-button-prev"
							style={{
								backgroundColor: arrowIconsBackgroundColor,
								borderRadius: arrowIconsBorderRadius,
								borderColor: arrowIconsBorderColor,
								borderWidth: arrowIconsBorderWidth,
							}}
						>
							{icons.leftArrow(arrowIconsColor)}
						</div>
						<div
							className="swiper-button-next"
							style={{
								backgroundColor: arrowIconsBackgroundColor,
								borderRadius: arrowIconsBorderRadius,
								borderColor: arrowIconsBorderColor,
								borderWidth: arrowIconsBorderWidth,
							}}
						>
							{icons.rightArrow(arrowIconsColor)}
						</div>
					</div>
				</div>
				<div id="fullscreen-swiper-backdrop"></div>
				<div id="fullscreen-swiper-icon-close" style={{ display: "none" }}>
					{icons.close(fullScreenCloseButtonColor)}
				</div>
			</div>
		</>
	);
}
