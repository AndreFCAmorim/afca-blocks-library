/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { icons } from "./icons/index.js";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	return (
		<>
			{props.attributes.mosaicGallery === false && (
				<div
					className="afca-blocks-library afca-blocks-library--default"
					{...props.attributes}
				>
					<div className="swiper">
						<div className="block-slider-normal">
							<div className="swiper-wrapper">
								<InnerBlocks.Content />
							</div>

							<div className="afca-blocks-library__pagination">
								{props.attributes.pagination && (
									<div className="swiper-pagination"></div>
								)}
							</div>

							<div
								className="afca-blocks-library__navigation"
								style={{ borderRadius: props.attributes.sliderBorderRadius }}
							>
								{props.attributes.navigation && (
									<>
										<div
											className="swiper-button-prev"
											style={{
												backgroundColor:
													props.attributes.arrowIconsBackgroundColor,
												borderRadius: props.attributes.arrowIconsBorderRadius,
												borderColor: props.attributes.arrowIconsBorderColor,
												borderWidth: props.attributes.arrowIconsBorderWidth,
											}}
										>
											{icons.leftArrow(props.attributes.arrowIconsColor)}
										</div>
										<div
											className="swiper-button-next"
											style={{
												backgroundColor:
													props.attributes.arrowIconsBackgroundColor,
												borderRadius: props.attributes.arrowIconsBorderRadius,
												borderColor: props.attributes.arrowIconsBorderColor,
												borderWidth: props.attributes.arrowIconsBorderWidth,
											}}
										>
											{icons.rightArrow(props.attributes.arrowIconsColor)}
										</div>
									</>
								)}
							</div>

							<div className="afca-blocks-library__scrollbar">
								{props.attributes.scrollBar && (
									<div className="swiper-scrollbar"></div>
								)}
							</div>
						</div>
					</div>
					{props.attributes.allowFullScreen && (
						<>
							<div id="fullscreen-swiper"></div>
							<div id="fullscreen-swiper-backdrop"></div>
							<div
								id="fullscreen-swiper-icon-close"
								style={{ display: "none" }}
							>
								{icons.close(props.attributes.fullScreenCloseButtonColor)}
							</div>
						</>
					)}
				</div>
			)}
			{props.attributes.mosaicGallery === true && (
				<div
					className="afca-blocks-library afca-blocks-library--mosaic-gallery"
					{...props.attributes}
				>
					<div className="swiper">
						<div className="block-slider-normal">
							<div className="swiper-wrapper">
								<InnerBlocks.Content />
							</div>
						</div>
						{props.attributes.itemsCount > 4 && (
							<div
								className="afca-blocks-library__items-number"
								style={{
									"--smallCountRadius": props.attributes.smallCountRadius,
									"--mediumCountRadius": props.attributes.mediumCountRadius,
									"--largeCountRadius": props.attributes.largeCountRadius,
								}}
							>
								<span>+ {props.attributes.itemsCount - 1}</span>
							</div>
						)}
					</div>
					<div id="fullscreen-swiper">
						<div className="afca-blocks-library__pagination">
							<div className="swiper-pagination"></div>
						</div>
						<div className="afca-blocks-library__navigation">
							<div
								className="swiper-button-prev"
								style={{
									backgroundColor: props.attributes.arrowIconsBackgroundColor,
									borderRadius: props.attributes.arrowIconsBorderRadius,
									borderColor: props.attributes.arrowIconsBorderColor,
									borderWidth: props.attributes.arrowIconsBorderWidth,
								}}
							>
								{icons.leftArrow(props.attributes.arrowIconsColor)}
							</div>
							<div
								className="swiper-button-next"
								style={{
									backgroundColor: props.attributes.arrowIconsBackgroundColor,
									borderRadius: props.attributes.arrowIconsBorderRadius,
									borderColor: props.attributes.arrowIconsBorderColor,
									borderWidth: props.attributes.arrowIconsBorderWidth,
								}}
							>
								{icons.rightArrow(props.attributes.arrowIconsColor)}
							</div>
						</div>
					</div>
					<div id="fullscreen-swiper-backdrop"></div>
					<div id="fullscreen-swiper-icon-close" style={{ display: "none" }}>
						{icons.close(props.attributes.fullScreenCloseButtonColor)}
					</div>
				</div>
			)}
		</>
	);
}

function DefaultSlider() {
	return (
		<div
			className="afca-blocks-library afca-blocks-library--mosaic-gallery"
			{...props.attributes}
		>
			<div className="swiper">
				<div className="block-slider-normal">
					<div className="swiper-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
				{props.attributes.itemsCount > 4 && (
					<div
						className="afca-blocks-library__items-number"
						style={{
							"--smallCountRadius": props.attributes.smallCountRadius,
							"--mediumCountRadius": props.attributes.mediumCountRadius,
							"--largeCountRadius": props.attributes.largeCountRadius,
						}}
					>
						<span>+ {props.attributes.itemsCount - 1}</span>
					</div>
				)}
			</div>
			<div id="fullscreen-swiper">
				<div className="afca-blocks-library__pagination">
					<div className="swiper-pagination"></div>
				</div>
				<div className="afca-blocks-library__navigation">
					<div
						className="swiper-button-prev"
						style={{
							backgroundColor: props.attributes.arrowIconsBackgroundColor,
							borderRadius: props.attributes.arrowIconsBorderRadius,
							borderColor: props.attributes.arrowIconsBorderColor,
							borderWidth: props.attributes.arrowIconsBorderWidth,
						}}
					>
						{icons.leftArrow(props.attributes.arrowIconsColor)}
					</div>
					<div
						className="swiper-button-next"
						style={{
							backgroundColor: props.attributes.arrowIconsBackgroundColor,
							borderRadius: props.attributes.arrowIconsBorderRadius,
							borderColor: props.attributes.arrowIconsBorderColor,
							borderWidth: props.attributes.arrowIconsBorderWidth,
						}}
					>
						{icons.rightArrow(props.attributes.arrowIconsColor)}
					</div>
				</div>
			</div>
			<div id="fullscreen-swiper-backdrop"></div>
			<div id="fullscreen-swiper-icon-close" style={{ display: "none" }}>
				{icons.close(props.attributes.fullScreenCloseButtonColor)}
			</div>
		</div>
	);
}

function MosaicGallery() {
	return (
		<div
			className="afca-blocks-library afca-blocks-library--mosaic-gallery"
			{...props.attributes}
		>
			<div className="swiper">
				<div className="block-slider-normal">
					<div className="swiper-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
				{props.attributes.itemsCount > 4 && (
					<div
						className="afca-blocks-library__items-number"
						style={{
							"--smallCountRadius": props.attributes.smallCountRadius,
							"--mediumCountRadius": props.attributes.mediumCountRadius,
							"--largeCountRadius": props.attributes.largeCountRadius,
						}}
					>
						<span>+ {props.attributes.itemsCount - 1}</span>
					</div>
				)}
			</div>
			<div id="fullscreen-swiper">
				<div className="afca-blocks-library__pagination">
					<div className="swiper-pagination"></div>
				</div>
				<div className="afca-blocks-library__navigation">
					<div
						className="swiper-button-prev"
						style={{
							backgroundColor: props.attributes.arrowIconsBackgroundColor,
							borderRadius: props.attributes.arrowIconsBorderRadius,
							borderColor: props.attributes.arrowIconsBorderColor,
							borderWidth: props.attributes.arrowIconsBorderWidth,
						}}
					>
						{icons.leftArrow(props.attributes.arrowIconsColor)}
					</div>
					<div
						className="swiper-button-next"
						style={{
							backgroundColor: props.attributes.arrowIconsBackgroundColor,
							borderRadius: props.attributes.arrowIconsBorderRadius,
							borderColor: props.attributes.arrowIconsBorderColor,
							borderWidth: props.attributes.arrowIconsBorderWidth,
						}}
					>
						{icons.rightArrow(props.attributes.arrowIconsColor)}
					</div>
				</div>
			</div>
			<div id="fullscreen-swiper-backdrop"></div>
			<div id="fullscreen-swiper-icon-close" style={{ display: "none" }}>
				{icons.close(props.attributes.fullScreenCloseButtonColor)}
			</div>
		</div>
	);
}
