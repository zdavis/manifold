import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Partial from "./partial";
import EmptyMessage from "./EmptyMessage";

export default class FilteredList extends PureComponent {
  static displayName = "Notes.FilteredList";

  static propTypes = {
    section: PropTypes.object,
    sortedAnnotations: PropTypes.array,
    handleSeeAllClick: PropTypes.func,
    handleFilterChange: PropTypes.func,
    handleVisitAnnotation: PropTypes.func,
    currentSectionId: PropTypes.string,
    filter: PropTypes.object,
    annotated: PropTypes.bool,
    loaded: PropTypes.bool
  };

  static defaultProps = {
    annotated: false,
    loaded: false
  };

  static defaultProps = {
    annotations: []
  };

  renderHeading() {
    return (
      <div className="drawer-bar">
        <h2 className="drawer-bar__title drawer-bar__title--large">
          <div
            className="drawer-bar__title-button"
            role="button"
            tabIndex="0"
            onClick={this.props.handleSeeAllClick}
          >
            Your Notes
          </div>
        </h2>
        {this.props.sortedAnnotations.length > 0 ? (
          <button
            onClick={this.props.handleSeeAllClick}
            className="button-primary"
          >
            <span className="button-primary__text">See all</span>
          </button>
        ) : null}
      </div>
    );
  }

  renderList() {
    if (this.props.sortedAnnotations.length === 0) {
      return <EmptyMessage annotated={this.props.annotated} />;
    }
    return (
      <ul>
        {this.props.sortedAnnotations.map(group => {
          return (
            <Partial.Group
              key={group.sectionId}
              annotations={group.annotations}
              sectionName={group.name}
              readerSection={this.props.section}
              visitHandler={this.props.handleVisitAnnotation}
            />
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeading()}
        <Partial.Filters
          filterChangeHandler={this.props.handleFilterChange}
          filter={this.props.filter}
        />
        <div>{this.props.loaded ? this.renderList() : null}</div>
      </div>
    );
  }
}
