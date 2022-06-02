import PropTypes from 'prop-types';
import '../css/style.masterplan.css'
import '../css/style.inbox.css'



export default function ConversionCard ({ conversationProp }) {
	const { _id, conversationName, dateCreated, ownerOfThisConvoId, isActive } = conversationProp





	return (
		<React.Fragment>
			<div>
				<span className="conversationCard-text01">{conversationName}</span>
			</div>
		</React.Fragment>
	)
}





ConversionCard.propTypes = {
	// shape() - used to check that the prop conforms to a specific
	conversationProp: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		conversationName: PropTypes.string.isRequired,
		dateCreated: PropTypes.string.isRequired,
		ownerOfThisConvoId: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired
	})
}