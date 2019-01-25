import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";
import LoadingBlock from "global/components/loading-block";
import Layout from "frontend/components/layout";
import ResourceCollectionList from "frontend/components/resource-collection-list";
import ResourceList from "frontend/components/resource-list";
import TextList from "frontend/components/text-list";
import Hero from "./Hero";
import Event from "frontend/components/event";
import Meta from "global/components/meta";
import ContentBlock from "frontend/components/content-block";

class Detail extends Component {
  static displayName = "Project.Detail";

  static propTypes = {
    project: PropTypes.object,
    settings: PropTypes.object
  };

  componentDidMount() {
    if (window && window.ScrollTo) window.scrollTo(0, 0);
  }

  render() {
    if (!this.props.project) return <LoadingBlock />;
    return (
      <div>
        <Hero project={this.props.project} />
        <ContentBlock project={this.props.project} />
        <Layout.ButtonNavigation />
      </div>
    );
  }
}

export default Detail;
