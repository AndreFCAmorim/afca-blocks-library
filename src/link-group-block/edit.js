import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		groupLinkUrl,
		groupLinkTarget,
		groupLinkRel,
		groupAriaLabel
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Link Settings', 'afca-blocks-library')} initialOpen={true}>
					<TextControl
						label={__('URL', 'afca-blocks-library')}
						value={groupLinkUrl}
						onChange={(value) => setAttributes({ groupLinkUrl: value })}
					/>
					<SelectControl
						label={__('Link Target', 'afca-blocks-library')}
						value={groupLinkTarget}
						options={[
							{ label: __('Same tab (_self)', 'afca-blocks-library'), value: '_self' },
							{ label: __('New tab (_blank)', 'afca-blocks-library'), value: '_blank' },
						]}
						onChange={(value) => setAttributes({ groupLinkTarget: value })}
					/>
					<TextControl
						label={__('Rel attribute', 'afca-blocks-library')}
						value={groupLinkRel}
						onChange={(value) => setAttributes({ groupLinkRel: value })}
					/>
					<TextControl
						label={__('Aria Label', 'afca-blocks-library')}
						value={groupAriaLabel}
						onChange={(value) => setAttributes({ groupAriaLabel: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<InnerBlocks />
		</>
	);
}
