import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class IconBooksOnShelf extends Component {
  static displayName = "Icon.BooksOnShelf";

  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
  };

  static defaultProps = {
    size: 64,
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
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M48.522,10 L36.417,11.872 L42.4,50.553 L35.188,50.553 L35.188,11.257 L22.939,11.257 L22.939,50.553 L20.819,50.553 L20.819,11.257 L8.57,11.257 L8.57,50.553 L4,50.553 L4,52.553 L59.467,52.553 L59.467,50.553 L50.237,50.553 L54.688,49.865 L48.522,10 Z M38.699,13.542 L46.851,12.281 L52.405,48.194 L44.254,49.455 L38.699,13.542 Z M24.939,15.622 L33.188,15.622 L33.188,13.257 L24.939,13.257 L24.939,15.622 Z M10.57,16.689 L18.819,16.689 L18.819,13.257 L10.57,13.257 L10.57,16.689 Z M24.939,19.725 L33.188,19.725 L33.188,17.622 L24.939,17.622 L24.939,19.725 Z M10.57,44.164 L18.819,44.164 L18.819,18.689 L10.57,18.689 L10.57,44.164 Z M24.939,41.127 L33.188,41.127 L33.188,21.726 L24.939,21.726 L24.939,41.127 Z M24.939,45.23 L33.188,45.23 L33.188,43.127 L24.939,43.127 L24.939,45.23 Z M10.57,49.596 L18.819,49.596 L18.819,46.163 L10.57,46.163 L10.57,49.596 Z M24.939,49.595 L33.188,49.595 L33.188,47.23 L24.939,47.23 L24.939,49.595 Z M45.8783,32.9758 C47.0433,32.7958 47.8403,31.7058 47.6603,30.5418 C47.4803,29.3778 46.3903,28.5798 45.2263,28.7598 C44.0623,28.9408 43.2643,30.0308 43.4443,31.1948 C43.6243,32.3588 44.7143,33.1568 45.8783,32.9758"
        />
      </svg>
    );
  }
}
