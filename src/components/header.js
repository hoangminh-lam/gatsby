import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <div
      className="header"
    >
      <ul>
        <li>
          <Link to="/">
            ホーム
          </Link>
        </li>
        <li>
          <Link to="/project">
            プロジェクト
          </Link>
        </li>
        <li>
          <Link to="/user-info">
            ユーザー情報
          </Link>
        </li>
        <li>
          <Link to="/faq">
            FAQ
          </Link>
        </li>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
