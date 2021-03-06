import React from "react";
import hoistStatics from "hoist-non-react-statics";
import { connect } from "react-redux";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default function withCurrentUser(WrappedComponent) {
  const displayName = `HigherOrder.WithCurrentUser('${getDisplayName(
    WrappedComponent
  )})`;

  class WithCurrentUser extends React.PureComponent {
    static mapStateToProps = state => {
      const user = state.authentication.authenticated
        ? state.authentication.currentUser
        : null;
      return {
        currentUser: user
      };
    };

    static WrappedComponent = WrappedComponent;

    static displayName = displayName;

    render() {
      const props = { ...this.props };
      return React.createElement(WrappedComponent, props);
    }
  }

  const ConnectedWithCurrentUser = connect(WithCurrentUser.mapStateToProps)(
    WithCurrentUser
  );

  return hoistStatics(ConnectedWithCurrentUser, WrappedComponent);
}
