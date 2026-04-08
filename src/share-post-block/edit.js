import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import Controls from './controls.js';
import { NETWORKS, NETWORK_COLORS, getIcon } from './icons.js';

export default function Edit( props ) {
	const {
		enabledNetworks,
		iconSize,
		iconStyle,
		iconSpacing,
		showLabel,
		labelText,
		alignment,
		iconColor,
		iconBgColor,
	} = props.attributes;

	const blockProps = useBlockProps( {
		className: `afca-blocks-share-post align-${ alignment }`,
	} );

	const visibleNetworks = NETWORKS.filter( ( n ) =>
		enabledNetworks.includes( n.id )
	);

	const getPadding = () => {
		if ( iconStyle === 'minimal' ) return 0;
		return Math.round( iconSize * 0.35 );
	};

	const getBackground = ( networkId ) => {
		if ( iconBgColor ) return iconBgColor;
		if ( iconStyle === 'filled' ) return NETWORK_COLORS[ networkId ];
		return 'transparent';
	};

	const getBorder = ( networkId ) => {
		if ( iconStyle === 'outlined' ) {
			const color = iconColor || NETWORK_COLORS[ networkId ];
			return `2px solid ${ color }`;
		}
		return 'none';
	};

	const getIconColor = ( networkId ) => {
		if ( iconColor ) return iconColor;
		if ( iconStyle === 'filled' ) return '#ffffff';
		return NETWORK_COLORS[ networkId ];
	};

	return (
		<div { ...blockProps }>
			<Controls { ...props } />

			{ showLabel && labelText && (
				<span className="afca-share-label">{ labelText }</span>
			) }

			<div
				className="afca-share-icons"
				style={ { gap: `${ iconSpacing }px` } }
			>
				{ visibleNetworks.length === 0 && (
					<p className="afca-share-placeholder">
						{ __( 'No networks selected. Please enable at least one social network in the block settings.', 'afca-blocks-library' ) }
					</p>
				) }

				{ visibleNetworks.map( ( network ) => (
					<span
						key={ network.id }
						className={ `afca-share-icon afca-share-icon--${ network.id } afca-share-icon--${ iconStyle }` }
						title={ network.label }
						style={ {
							background: getBackground( network.id ),
							border: getBorder( network.id ),
							borderRadius: iconStyle !== 'minimal' ? '50%' : '0',
							padding: `${ getPadding() }px`,
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'default',
							color: getIconColor( network.id ),
						} }
					>
						{ getIcon( network.id, iconStyle, iconSize, getIconColor( network.id ) ) }
					</span>
				) ) }
			</div>
		</div>
	);
}
