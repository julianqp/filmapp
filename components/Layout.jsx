import PropTypes from 'prop-types'
import Footer from './Foooter'
import Header from './Header'

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className=" flex-grow">{children}</div>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
