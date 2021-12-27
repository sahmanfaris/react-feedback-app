import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'
import Card from '../shared/Card'

const FeedbackItem = ({ item, deleteItem }) => {
  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => deleteItem(item.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
