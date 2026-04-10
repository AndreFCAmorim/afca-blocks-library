import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { shortcode } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Shortcode Settings', 'afca-blocks-library' ) }>
					<TextControl
						label={ __( 'Shortcode', 'afca-blocks-library' ) }
						value={ shortcode }
						onChange={ ( value ) => setAttributes( { shortcode: value } ) }
						placeholder="[my_shortcode]"
						help={ __( 'Enter the full shortcode including brackets.', 'afca-blocks-library' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ shortcode ? (
					<div className="afca-shortcode-preview">
						<span className="afca-shortcode-tag">{ shortcode }</span>
						<span className="afca-shortcode-note">
							{ __( '— rendered on frontend', 'afca-blocks-library' ) }
						</span>
					</div>
				) : (
					<Placeholder
						icon="shortcode"
						label={ __( 'Shortcode', 'afca-blocks-library' ) }
						instructions={ __( 'Enter a shortcode in the block settings panel (⚙)', 'afca-blocks-library' ) }
					>
						<TextControl
							value={ shortcode }
							onChange={ ( value ) => setAttributes( { shortcode: value } ) }
							placeholder="[my_shortcode]"
						/>
					</Placeholder>
				) }
			</div>
		</>
	);
}
