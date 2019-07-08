import React, { Component } from "react";
import GroupItem from "./GroupItem";
import PropTypes from "prop-types";
import classNames from "classnames";
import debounce from "lodash/debounce";
import { UnmountClosed as Collapse } from "react-collapse";
import IconComposer from "global/components/utility/IconComposer";

export default class Group extends Component {
  static displayName = "Notes.Partial.Group";

  static propTypes = {
    readerSection: PropTypes.object,
    annotations: PropTypes.array,
    sectionName: PropTypes.string,
    visitHandler: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    this.preOpenItem();
  }

  preOpenItem = debounce(() => {
    const expanded =
      this.props.readerSection.attributes.name === this.props.sectionName;

    return this.setState({ expanded });
  }, 200);

  handleClick = event => {
    event.stopPropagation();
    return this.setState({ expanded: !this.state.expanded });
  };

  renderGroupItems(annotations) {
    const classes = classNames({
      open: this.state.expanded
    });

    return (
      <Collapse
        isOpened={this.state.expanded}
        springConfig={{ stiffness: 270 }}
      >
        <ul className={classes}>
          {annotations.map(annotation => {
            return (
              <GroupItem
                key={annotation.id}
                annotation={annotation}
                visitHandler={this.props.visitHandler}
              />
            );
          })}
        </ul>
      </Collapse>
    );
  }

  render() {
    const classes = classNames({
      item: true,
      open: this.state.expanded
    });
    return (
      <li>
        <div
          className={classes}
          onClick={this.handleClick}
          role="button"
          tabIndex="0"
          aria-expanded={this.state.expanded}
        >
          <IconComposer
            icon="disclosureDown16"
            size={18}
            iconClass="item__disclosure-icon"
          />
          <h3 className="item-label">{this.props.sectionName}</h3>
        </div>
        {this.renderGroupItems(this.props.annotations)}
      </li>
    );
  }
}
