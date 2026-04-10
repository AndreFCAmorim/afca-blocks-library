import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<p style={ { opacity: 0.5, fontStyle: 'italic', margin: 0 } }>
				{ __( 'Breadcrumbs (Rank Math) — rendered on frontend', 'afca-blocks-library' ) }
			</p>
		</div>
	);
}
