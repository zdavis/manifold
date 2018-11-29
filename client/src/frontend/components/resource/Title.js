import React, { Component } from "react";
import PropTypes from "prop-types";
import FormattedDate from "global/components/formatted-date";
import Utility from "global/components/utility";

export default class ResourceTitle extends Component {
  static displayName = "Resource.Title";

  static propTypes = {
    resource: PropTypes.object,
    showIcon: PropTypes.bool,
    showDate: PropTypes.bool
  };

  static defaultProps = {
    showIcon: true,
    showDate: true
  };

  render() {
    const attr = this.props.resource.attributes;

    return (
      <div className="resource-title">
        {this.props.showIcon ? (
          <figure className={`resource-icon ${attr.kind}`}>
            <Utility.IconComposer icon={`resource-${attr.kind}`} size={60} />
          </figure>
        ) : null}
        <div>
          <h1 dangerouslySetInnerHTML={{ __html: attr.titleFormatted }} />
          {this.props.showDate ? (
            <span className="resource-date">
              {"Resource added "}
              <FormattedDate format="MMMM, YYYY" date={attr.createdAt} />
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}