import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	__experimentalInputControl as InputControl,
	CheckboxControl,
} from '@wordpress/components';
import { NETWORKS } from './icons.js';

export default function Controls( props ) {
	const {
		enabledNetworks,
		iconSize,
		iconStyle,
		iconSpacing,
		openInNewTab,
		showLabel,
		labelText,
		alignment,
	} = props.attributes;

	const handleNetworkToggle = ( networkId, checked ) => {
		const updated = checked
			? [ ...enabledNetworks, networkId ]
			: enabledNetworks.filter( ( id ) => id !== networkId );
		props.setAttributes( { enabledNetworks: updated } );
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Social Networks', 'afca-blocks-library' ) }
				initialOpen={ true }
			>
				{ NETWORKS.map( ( network ) => (
					<CheckboxControl
						key={ network.id }
						label={ network.label }
						checked={ enabledNetworks.includes( network.id ) }
						onChange={ ( checked ) =>
							handleNetworkToggle( network.id, checked )
						}
					/>
				) ) }
			</PanelBody>

			<PanelBody
				title={ __( 'Icon Style', 'afca-blocks-library' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Style', 'afca-blocks-library' ) }
					value={ iconStyle }
					options={ [
						{
							label: __( 'Filled (colored background)', 'afca-blocks-library' ),
							value: 'filled',
						},
						{
							label: __( 'Outlined (colored icon)', 'afca-blocks-library' ),
							value: 'outlined',
						},
						{
							label: __( 'Minimal (no background)', 'afca-blocks-library' ),
							value: 'minimal',
						},
					] }
					onChange={ ( value ) =>
						props.setAttributes( { iconStyle: value } )
					}
				/>

				<RangeControl
					label={ __( 'Icon Size (px)', 'afca-blocks-library' ) }
					value={ iconSize }
					min={ 16 }
					max={ 64 }
					step={ 2 }
					onChange={ ( value ) =>
						props.setAttributes( { iconSize: value } )
					}
				/>

				<RangeControl
					label={ __( 'Spacing Between Icons (px)', 'afca-blocks-library' ) }
					value={ iconSpacing }
					min={ 0 }
					max={ 32 }
					step={ 2 }
					onChange={ ( value ) =>
						props.setAttributes( { iconSpacing: value } )
					}
				/>

				<SelectControl
					label={ __( 'Alignment', 'afca-blocks-library' ) }
					value={ alignment }
					options={ [
						{ label: __( 'Left', 'afca-blocks-library' ), value: 'left' },
						{ label: __( 'Center', 'afca-blocks-library' ), value: 'center' },
						{ label: __( 'Right', 'afca-blocks-library' ), value: 'right' },
					] }
					onChange={ ( value ) =>
						props.setAttributes( { alignment: value } )
					}
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Label', 'afca-blocks-library' ) }
				initialOpen={ false }
			>
				<ToggleControl
					checked={ showLabel }
					label={ __( 'Show label text', 'afca-blocks-library' ) }
					onChange={ ( value ) =>
						props.setAttributes( { showLabel: value } )
					}
				/>
				{ showLabel && (
					<InputControl
						label={ __( 'Label text', 'afca-blocks-library' ) }
						value={ labelText }
						onChange={ ( value ) =>
							props.setAttributes( { labelText: value } )
						}
					/>
				) }
			</PanelBody>

			<PanelBody
				title={ __( 'Behaviour', 'afca-blocks-library' ) }
				initialOpen={ false }
			>
				<ToggleControl
					checked={ openInNewTab }
					label={ __( 'Open share links in new tab', 'afca-blocks-library' ) }
					onChange={ ( value ) =>
						props.setAttributes( { openInNewTab: value } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
