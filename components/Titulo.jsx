import PropTypes from 'prop-types'

const Titulo = ({ title }) => (
  <div className="w-full my-5 px-5 text-4xl text-left">
    <h1>{title}</h1>
  </div>
)

Titulo.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Titulo
