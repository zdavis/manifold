import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class IconEyeOpen extends Component {
  static displayName = "Icon.EyeOpen";

  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
  };

  static defaultProps = {
    size: 32,
    fill: "currentColor"
  };

  render() {
    const { iconClass, size, fill, stroke } = this.props;
    const classes = classnames("manicon-svg", iconClass);

    return (
      <svg
        className={classes}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={fill}
        stroke={stroke}
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.0027,12.509 C14.3487,12.509 13.0027,13.855 13.0027,15.509 C13.0027,17.163 14.3487,18.509 16.0027,18.509 C17.6567,18.509 19.0027,17.163 19.0027,15.509 C19.0027,13.855 17.6567,12.509 16.0027,12.509 M16.0027,19.509 C13.7967,19.509 12.0027,17.715 12.0027,15.509 C12.0027,13.303 13.7967,11.509 16.0027,11.509 C18.2087,11.509 20.0027,13.303 20.0027,15.509 C20.0027,17.715 18.2087,19.509 16.0027,19.509 M5.242,15.508 C6.262,16.807 10.683,22.015 16.003,22.015 C21.322,22.015 25.743,16.808 26.763,15.508 C25.743,14.208 21.322,9 16.003,9 C10.675,9 6.261,14.208 5.242,15.508 M16.003,23.015 C9.437,23.015 4.418,16.093 4.207,15.799 L4,15.508 L4.207,15.217 C4.418,14.923 9.437,8 16.003,8 C22.568,8 27.588,14.923 27.798,15.217 L28.006,15.508 L27.798,15.799 C27.588,16.093 22.568,23.015 16.003,23.015"
        />
      </svg>
    );
  }
}
