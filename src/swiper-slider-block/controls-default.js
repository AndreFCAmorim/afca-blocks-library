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
import { PanelColorSettings, InspectorControls } from "@wordpress/block-editor";

/**
 * Includes a library of generic WordPress components to be used for creating common UI elements.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/select-control/
 */
import {
	PanelBody,
	PanelRow,
	TabPanel,
	ToggleControl,
	RangeControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

export default function DefaultSliderControls(props) {
	const {
		autoPlay,
		loop,
		navigation,
		pagination,
		slidesPerView,
		spaceBetweenImages,
		speed,
		sliderBorderRadius,
		allowFullScreen,
		arrowIconsBackgroundColor,
		arrowIconsColor,
		arrowIconsBorderRadius,
		arrowIconsBorderColor,
		arrowIconsBorderWidth,
		paginationType,
		paginationBackgroundColor,
		fullScreenCloseButtonColor,
		fullScreenCloseButtonBackgroundColor,
	} = props.attributes;

	const onChangeAutoplay = (value) => {
		props.setAttributes({ autoPlay: value });
	};

	const onChangeLoop = (value) => {
		props.setAttributes({ loop: value });
	};

	const onChangeNavigation = (value) => {
		props.setAttributes({ navigation: value });
	};

	const onChangePagination = (value) => {
		props.setAttributes({ pagination: value });
	};

	const onChangeSlidesPerView = (value) => {
		props.setAttributes({ slidesPerView: value });
	};

	const onChangeSpaceBetweenImages = (value) => {
		props.setAttributes({ spaceBetweenImages: value });
	};

	const onChangeSpeed = (value) => {
		props.setAttributes({ speed: value });
	};

	const onChangeSliderBorderRadius = (value) => {
		props.setAttributes({ sliderBorderRadius: value });
	};

	const onChangeAllowFullScreen = (value) => {
		props.setAttributes({ allowFullScreen: value });
	};

	const onChangeArrowBackgroundColor = (value) => {
		props.setAttributes({
			arrowIconsBackgroundColor: getColorFromVar(value),
		});
	};

	const onChangeArrowColor = (value) => {
		props.setAttributes({ arrowIconsColor: getColorFromVar(value) });
	};

	const onChangeArrowBorderRadius = (value) => {
		props.setAttributes({ arrowIconsBorderRadius: value });
	};

	const onChangeArrowBorderColor = (value) => {
		props.setAttributes({ arrowIconsBorderColor: getColorFromVar(value) });
	};

	const onChangeArrowBorderWidth = (value) => {
		props.setAttributes({ arrowIconsBorderWidth: value });
	};

	const onChangePaginationType = (value) => {
		props.setAttributes({ paginationType: value });
	};

	const onChangePaginationBackgroundColor = (value) => {
		props.setAttributes({ paginationBackgroundColor: getColorFromVar(value) });
	};

	const onChangeFullScreenCloseButtonColor = (value) => {
		props.setAttributes({ fullScreenCloseButtonColor: getColorFromVar(value) });
	};

	const onChangeFullScreenCloseButtonBackgroundColor = (value) => {
		props.setAttributes({
			fullScreenCloseButtonBackgroundColor: getColorFromVar(value),
		});
	};

	const getColorFromVar = (color) => {
		if (typeof color === "string" && color.startsWith("var(--")) {
			return window
				.getComputedStyle(document.body)
				.getPropertyValue(color.substring(5));
		} else {
			return color;
		}
	};

	return (
		<InspectorControls>
			<TabPanel
				className="block-editor-block-inspector__tabs"
				selectOnMove="true"
				tabs={[
					{
						name: "settings",
						title: __("Settings", "afca-blocks-library"),
						className: "block-editor-block-inspector__tab-item",
						icon: "admin-settings",
					},
					{
						name: "styles",
						title: __("Styles", "afca-blocks-library"),
						className: "block-editor-block-inspector__tab-item",
						icon: "admin-appearance",
					},
				]}
			>
				{(tab) => (
					<>
						{tab.name === "settings" && (
							<PanelBody>
								<PanelRow>
									{__("Visible only on frontend", "afca-blocks-library")}
								</PanelRow>

								<ToggleControl
									label={__("Autoplay", "afca-blocks-library")}
									checked={autoPlay}
									onChange={onChangeAutoplay}
								/>

								<ToggleControl
									label={__("Loop", "afca-blocks-library")}
									checked={loop}
									onChange={onChangeLoop}
								/>

								<ToggleControl
									label={__("Navigation", "afca-blocks-library")}
									checked={navigation}
									onChange={onChangeNavigation}
								/>

								<ToggleControl
									label={__("Pagination", "afca-blocks-library")}
									checked={pagination}
									onChange={onChangePagination}
								/>

								<ToggleControl
									label={__("Allow full screen", "afca-blocks-library")}
									checked={allowFullScreen}
									onChange={onChangeAllowFullScreen}
								/>

								<RangeControl
									label={__("Sliders per view", "afca-blocks-library")}
									initialPosition={slidesPerView}
									min={1}
									max={10}
									onChange={onChangeSlidesPerView}
								/>

								<RangeControl
									label={__("Space between images", "afca-blocks-library")}
									initialPosition={spaceBetweenImages}
									min={0}
									max={100}
									onChange={onChangeSpaceBetweenImages}
								/>

								<RangeControl
									label={__("Speed", "afca-blocks-library")}
									initialPosition={speed}
									min={1}
									max={1000}
									onChange={onChangeSpeed}
								/>
							</PanelBody>
						)}
						{tab.name === "styles" && (
							<>
								{navigation && (
									<PanelColorSettings
										title={__("Navigation Colors", "afca-blocks-library")}
										initialOpen={false}
										colorSettings={[
											{
												value: arrowIconsBackgroundColor,
												onChange: onChangeArrowBackgroundColor,
												label: __("Background", "afca-blocks-library"),
											},
											{
												value: arrowIconsColor,
												onChange: onChangeArrowColor,
												label: __("Color", "afca-blocks-library"),
											},
											{
												value: arrowIconsBorderColor,
												onChange: onChangeArrowBorderColor,
												label: __("Border color", "afca-blocks-library"),
											},
										]}
									/>
								)}

								<PanelBody>
									{navigation && (
										<>
											<RangeControl
												label={__(
													"Navigation Border radius",
													"afca-blocks-library"
												)}
												initialPosition={arrowIconsBorderRadius}
												min={0}
												max={100}
												onChange={onChangeArrowBorderRadius}
											/>

											<RangeControl
												label={__(
													"Navigation Border width",
													"afca-blocks-library"
												)}
												initialPosition={arrowIconsBorderWidth}
												min={0}
												max={100}
												onChange={onChangeArrowBorderWidth}
											/>
										</>
									)}

									<RangeControl
										label={__(
											"Slider Border radius",
											"afca-blocks-library"
										)}
										initialPosition={sliderBorderRadius}
										min={0}
										max={100}
										onChange={onChangeSliderBorderRadius}
									/>
								</PanelBody>

								{pagination && (
									<>
										<PanelBody>
											<ToggleGroupControl
												onChange={onChangePaginationType}
												label={__(
													"Pagination Type",
													"afca-blocks-library"
												)}
												value={paginationType}
												isBlock
											>
												<ToggleGroupControlOption
													value={0}
													label={__("Bullets", "afca-blocks-library")}
												/>
												<ToggleGroupControlOption
													value={1}
													label={__("Bars", "afca-blocks-library")}
												/>
												<ToggleGroupControlOption
													value={2}
													label={__("Progress bar", "afca-blocks-library")}
												/>
											</ToggleGroupControl>
										</PanelBody>
										<PanelColorSettings
											title={__(
												"Pagination Colors",
												"afca-blocks-library"
											)}
											initialOpen={false}
											colorSettings={[
												{
													value: paginationBackgroundColor,
													onChange: onChangePaginationBackgroundColor,
													label: __("Background", "afca-blocks-library"),
												},
											]}
										/>
									</>
								)}

								{allowFullScreen && (
									<PanelColorSettings
										title={__(
											"Close full screen button",
											"afca-blocks-library"
										)}
										initialOpen={false}
										colorSettings={[
											{
												value: fullScreenCloseButtonColor,
												onChange: onChangeFullScreenCloseButtonColor,
												label: __("Color", "afca-blocks-library"),
											},
											{
												value: fullScreenCloseButtonBackgroundColor,
												onChange: onChangeFullScreenCloseButtonBackgroundColor,
												label: __("Background", "afca-blocks-library"),
											},
										]}
									/>
								)}
							</>
						)}
					</>
				)}
			</TabPanel>
		</InspectorControls>
	);
}
