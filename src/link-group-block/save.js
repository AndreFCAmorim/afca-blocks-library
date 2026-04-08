import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		groupLinkUrl,
		groupLinkTarget,
		groupLinkRel,
		groupAriaLabel,
	} = attributes;

	return (
		<a
			{ ...useBlockProps.save() }
			href={groupLinkUrl}
			target={groupLinkTarget}
			rel={groupLinkRel || undefined}
			aria-label={groupAriaLabel || undefined}
		>
			<InnerBlocks.Content />
		</a>
	);
}
