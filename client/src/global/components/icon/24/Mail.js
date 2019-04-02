import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Mail extends Component {
  static propTypes = {
    iconClass: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stroke: PropTypes.string,
    fill: PropTypes.string,
    svgProps: PropTypes.object
  };

  static defaultProps = {
    iconClass: "",
    size: "inherit",
    stroke: "currentColor",
    fill: "currentColor",
    svgProps: {}
  };

  get defaultHeight() {
    return 24;
  }

  get defaultWidth() {
    return 24;
  }

  get size() {
    return this.props.size;
  }

  get width() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultWidth;
    return this.size;
  }

  get height() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultHeight;
    return this.size;
  }

  get viewBox() {
    return "0 0 24 24";
  }

  get classes() {
    const { iconClass } = this.props;
    return classnames("manicon-svg", iconClass);
  }

  get fill() {
    return this.props.fill;
  }

  get stroke() {
    return this.props.stroke;
  }

  render() {
    const baseSvgProps = {
      xmlns: "http://www.w3.org/2000/svg",
      className: this.classes,
      width: this.width,
      height: this.height,
      viewBox: this.viewBox
    };

    const svgProps = Object.assign(baseSvgProps, this.props.svgProps);

    return (
      <svg {...svgProps}>
        <g fill="none" fillRule="evenodd">
          <path
            fill={this.fill}
            fillRule="nonzero"
            d="M4,8.05842693 L4,16.499 L20,16.499 L20,8.05875634 L12.0002,14.6468269 L4,8.05842693 Z M4.89374698,7.499 L12.0002,13.3513731 L19.106653,7.499 L4.89374698,7.499 Z M3,17.499 L3,6.499 L21,6.499 L21,17.499 L3,17.499 Z"
          />
          <path
            fill={this.fill}
            fillRule="nonzero"
            d="M4,8.05842693 L4,16.499 L20,16.499 L20,8.05875634 L12.0002,14.6468269 L4,8.05842693 Z M4.89374698,7.499 L12.0002,13.3513731 L19.106653,7.499 L4.89374698,7.499 Z M3,17.499 L3,6.499 L21,6.499 L21,17.499 L3,17.499 Z"
          />
        </g>
      </svg>
    );
  }
}
