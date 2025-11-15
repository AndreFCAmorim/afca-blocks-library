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
import { PanelBody, RangeControl } from "@wordpress/components";

export default function MosaicGalleryControls(props) {
	const {
		navigation,
		arrowIconsBackgroundColor,
		arrowIconsColor,
		arrowIconsBorderRadius,
		arrowIconsBorderColor,
		arrowIconsBorderWidth,
		fullScreenCloseButtonColor,
		fullScreenCloseButtonBackgroundColor,
	} = props.attributes;

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
							label={__("Navigation Border radius", "afca-blocks-library")}
							initialPosition={arrowIconsBorderRadius}
							min={0}
							max={100}
							onChange={onChangeArrowBorderRadius}
						/>

						<RangeControl
							label={__("Navigation Border width", "afca-blocks-library")}
							initialPosition={arrowIconsBorderWidth}
							min={0}
							max={100}
							onChange={onChangeArrowBorderWidth}
						/>
					</>
				)}
			</PanelBody>

			<PanelColorSettings
				title={__("Close full screen button", "afca-blocks-library")}
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
		</InspectorControls>
	);
}
