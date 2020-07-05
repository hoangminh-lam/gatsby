import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <div
      className="header"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <ul>
        <li>
          <Link to="/">
            ホーム
          </Link>
          <Link to="/article">
            記事
          </Link>
          <Link to="/project">
            プロジェクト
          </Link>
          <Link to="/user-info">
            ユーザー一覧
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
