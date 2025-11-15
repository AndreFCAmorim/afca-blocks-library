import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalInputControl as InputControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

export default function Controls( props ) {
	const {
		metaKey,
		renderType,
		showTextAdjacency,
		beforeText,
		afterText,
		altText,
		openLinkNewTab,
		textLink,
		imgAltText
	} = props.attributes;

	const handleMetaKeyChange = ( value ) => {
		props.setAttributes( { metaKey: value } );
	};

	const handleRenderTypeChange = ( value ) => {
		props.setAttributes( { renderType: value } );
	};

	const handleMetaShowTextAdjacencyChange = ( value ) => {
		props.setAttributes( { showTextAdjacency: value } );
	};
	const handleBeforeTextChange = ( value ) => {
		props.setAttributes( { beforeText: value } );
	};

	const handleAltTextChange = ( value ) => {
		props.setAttributes( { altText: value } );
	};

	const handleAfterTextChange = ( value ) => {
		props.setAttributes( { afterText: value } );
	};

	const handleOpenLinkNewTabChange = ( value ) => {
		props.setAttributes( { openLinkNewTab: value } );
	};

	const handleTextLinkChange = ( value ) => {
		props.setAttributes( { textLink: value } );
	};

	const handleImgAltTextChange = ( value ) => {
		props.setAttributes( { imgAltText: value } );
	};

	return (
		<InspectorControls>
			<PanelBody>
				<InputControl
					label={ __( 'Meta key', 'afca-blocks-library' ) }
					value={ metaKey }
					onChange={ handleMetaKeyChange }
				/>
				<ToggleControl
					checked={ showTextAdjacency }
					label={ __(
						'Show text adjacency?',
						'afca-blocks-library'
					) }
					onChange={ handleMetaShowTextAdjacencyChange }
				/>
				{ showTextAdjacency && (
					<>
						<InputControl
							label={ __(
								'Text before meta value',
								'afca-blocks-library'
							) }
							value={ beforeText }
							onChange={ handleBeforeTextChange }
						/>
						<InputControl
							label={ __(
								'Alternative text for meta value',
								'afca-blocks-library'
							) }
							value={ altText }
							onChange={ handleAltTextChange }
						/>
						<InputControl
							label={ __(
								'Text after meta value',
								'afca-blocks-library'
							) }
							value={ afterText }
							onChange={ handleAfterTextChange }
						/>
					</>
				) }
				<SelectControl
					label={ __( 'Render option', 'afca-blocks-library' ) }
					value={ renderType }
					options={ [
						{
							label: __( 'Text', 'afca-blocks-library' ),
							value: 'text',
						},
						{
							label: __( 'URL', 'afca-blocks-library' ),
							value: 'url',
						},
						{
							label: __( 'Image', 'afca-blocks-library' ),
							value: 'img',
						},
						{
							label: __( 'List', 'afca-blocks-library' ),
							value: 'list',
						},
					] }
					onChange={ handleRenderTypeChange }
				/>
				{ renderType == 'url' && (
					<>
						<ToggleControl
							checked={ openLinkNewTab }
							label={ __(
								'Open link in new tab',
								'afca-blocks-library'
							) }
							onChange={ handleOpenLinkNewTabChange }
						/>
						<InputControl
							label={ __(
								'Text for the link',
								'afca-blocks-library'
							) }
							value={ textLink }
							onChange={ handleTextLinkChange }
						/>
					</>
				) }
				{
					renderType == 'img' && (
						<InputControl
							label={ __(
								'Alternative text for image',
								'afca-blocks-library'
							) }
							value={ imgAltText }
							onChange={ handleImgAltTextChange }
						/>
						)
				}
			</PanelBody>
		</InspectorControls>
	);
}
