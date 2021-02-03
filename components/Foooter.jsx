const Footer = () => (
  <footer id="footer" className="inset-x-0 bottom-0 bg-gray-100 text-gray-700 body-font">
    <div className="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col">
      <p className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <span className="ml-3 text-xl p-2">JQP</span>
      </p>
      <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        {` © ${new Date().getFullYear()} Julián Querol Polo`}
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a
          className="ml-3 text-blue-500"
          href="https://www.linkedin.com/in/julianquerolpolo/"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              stroke="none"
              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
            />
            <circle cx="4" cy="4" r="2" stroke="none" />
          </svg>
        </a>
      </span>
    </div>
  </footer>
)

export default Footer
