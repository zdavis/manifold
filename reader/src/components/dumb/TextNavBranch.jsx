import React, { Component } from 'react';
import {Link} from 'react-router';
export default class NavigationBranch extends Component {

  static propTypes() {
    return {
      handleLinkClick: React.PropTypes.func.isRequired,
      pushState: React.PropTypes.func.isRequired,
      textSectionsMap: React.PropTypes.instanceOf(Map).isRequired,
      textId: React.PropTypes.number.isRequired,
      branch: React.PropTypes.shape({
        map: React.PropTypes.func.isRequired
      })
    };
  }

  handleLinkClick(branch, e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleLinkClick(e);
    const path = this.path(branch);
    this.props.pushState(null, path);
    return false;
  }

  path(branch) {
    const sectionId = branch.id;
    const textId = this.props.textId;
    let path = `/text/${textId}/section/${sectionId}`;
    const branchAnchor = branch.anchor ? `#${branch.anchor}` : '';
    if(branchAnchor) {
      path = path + branchAnchor;
    }
    return path;
  }

  render() {
    if(this.props.branch) {
      return(
        <ul>
          {this.props.branch.map((branch, i) => {

            return(
              <li onClick={(e) => {this.handleLinkClick(branch, e);}} key={`${branch.sourceIdentifier}-${i}`}>
                 <a href={this.path(branch)}>
                  {branch.label}
                </a>
                {(() => {
                  if(branch.children && branch.children.length > 0) {
                    return(
                      <NavigationBranch {...this.props} branch={branch.children} />                  
                    );
                  }
                })()}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  }
}



