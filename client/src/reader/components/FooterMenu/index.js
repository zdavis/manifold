import React, { Component } from "react";
import PropTypes from "prop-types";
import ControlMenu from "reader/components/control-menu";

import Authorize from "hoc/authorize";

export default class Footer extends Component {
  static propTypes = {
    visibility: PropTypes.object,
    commonActions: PropTypes.object
  };

  handlePanelToggle = panel => {
    this.props.commonActions.panelToggle(panel);
  };

  render() {
    return (
      <footer className="reader-footer-menu">
        <div className="container">
          <div className="menu-buttons">
            <ul aria-label="Reader Settings">
              <Authorize kind={"any"}>
                <li>
                  <ControlMenu.NotesButton
                    toggle={() => this.handlePanelToggle("notes")}
                    active={this.props.visibility.uiPanels.notes}
                  />
                </li>
              </Authorize>
              <li>
                <ControlMenu.VisibilityMenuButton
                  toggle={() => this.handlePanelToggle("visibility")}
                  active={this.props.visibility.uiPanels.visibility}
                />
              </li>
              <li>
                <ControlMenu.AppearanceMenuButton
                  toggleAppearanceMenu={() =>
                    this.handlePanelToggle("appearance")
                  }
                  active={this.props.visibility.uiPanels.appearance}
                />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}
