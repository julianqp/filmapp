import PropTypes from 'prop-types'

const Message = ({ msn }) => (
  <div>
    <p className="text-red-500">{msn}</p>
  </div>
)

Message.propTypes = {
  msn: PropTypes.string.isRequired,
}

export default Message
