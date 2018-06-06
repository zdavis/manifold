import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup as ReactCSSTransitionGroup } from "react-transition-group";
import Utility from "components/global/Utility";
import { Notifications } from "containers/global";
import isString from "lodash/isString";
import FocusTrap from "focus-trap-react";
import tabbable from "tabbable";
import has from "lodash/has";
import { notificationActions } from "actions";

export default class DrawerWrapper extends PureComponent {
  static mapStateToProps() {
    return {
      connected: true
    };
  }

  static displayName = "Drawer.Wrapper";

  static propTypes = {
    dispatch: PropTypes.func,
    connected: PropTypes.bool.isRequired,
    open: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    title: PropTypes.string,
    icon: PropTypes.string,
    identifier: PropTypes.string,
    closeUrl: PropTypes.string,
    closeCallback: PropTypes.func,
    lockScroll: PropTypes.string,
    entrySide: PropTypes.string,
    style: PropTypes.string,
    history: PropTypes.object,
    includeDrawerFrontMatter: PropTypes.bool
  };

  static childContextTypes = {
    pauseKeyboardEvents: PropTypes.func,
    unpauseKeyboardEvents: PropTypes.func
  };

  // NB lockScroll can be:
  // Hover (default): User can scroll the drawer on hover, but it doesn't effect body scroll
  // unless they intentionally do so.
  // Always: Having the drawer open locks the body scroll until it is closed
  // None: Scrolling the drawer invokes default browser behavior
  static defaultProps = {
    connected: false,
    lockScroll: "hover",
    open: false,
    style: "backend",
    entrySide: "right",
    includeDrawerFrontMatter: true
  };

  constructor(props) {
    super(props);
    this.state = {
      leaving: false,
      keyboardEventsPaused: false,
      focusable: false
    };
    this.focusTrapNode = React.createRef();
    if (props.open) {
      this.onOpen();
    }
  }

  getChildContext() {
    return {
      pauseKeyboardEvents: this.pauseKeyboardEvents,
      unpauseKeyboardEvents: this.unpauseKeyboardEvents
    };
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleLeaveKey);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (React.Children.count(nextProps.children) <= 0) {
      this.setState({ focusable: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.onOpen();
    }

    if (this.props.open && has(this.focusTrapNode, "current.node")) {
      if (tabbable(this.focusTrapNode.current.node).length > 0) {
        this.setState({ focusable: true });
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleLeaveKey);
  }

  onOpen() {
    this.clearGlobalNotifications();
  }

  clearDrawerNotifications() {
    if (this.props.dispatch)
      this.props.dispatch(notificationActions.removeNotifications("drawer"));
  }

  clearGlobalNotifications() {
    if (this.props.dispatch)
      this.props.dispatch(notificationActions.removeNotifications("global"));
  }

  handleLeaveKey = event => {
    if (this.state.keyboardEventsPaused) return null;
    if (event.keyCode === 27) {
      this.handleLeaveEvent(event);
    }
  };

  pauseKeyboardEvents = () => {
    this.setState({ keyboardEventsPaused: true });
  };

  unpauseKeyboardEvents = () => {
    this.setState({ keyboardEventsPaused: false });
  };

  handleLeaveEvent = event => {
    this.setState({
      leaving: true
    });

    this.clearDrawerNotifications();

    /*
      NB: Running this callback without a timeout causes the drawer
      to close without a transition. However, running a timeout causes
      an error as well.
    */
    if (this.props.closeCallback) {
      this.props.closeCallback(event);
    }

    if (this.props.closeUrl) {
      setTimeout(() => {
        this.props.history.push(this.props.closeUrl);
      }, 200);
    }
  };

  renderDrawerFrontMatter(props) {
    if (!props.includeDrawerFrontMatter) return null;
    const hasTitle = props.title || props.icon;
    const hasClose = props.closeCallback || props.closeUrl;
    return (
      <div className="drawer-bar">
        {hasTitle ? (
          <div className="drawer-title">
            {props.icon ? (
              <i
                className={`manicon manicon-${props.icon}`}
                aria-hidden="true"
              />
            ) : null}
            {props.title ? props.title : null}
          </div>
        ) : null}
        {hasClose ? (
          <div
            onClick={this.handleLeaveEvent}
            role="button"
            tabIndex="0"
            className="close-button-primary"
          >
            <span className="close-text">Close</span>
            <i className="manicon manicon-x" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    );
  }

  renderDrawer() {
    const entrySideClass =
      this.props.entrySide === "left" ? this.props.entrySide : "";
    return (
      <div
        key="drawer"
        className={`drawer-${this.props.style} ${entrySideClass}`}
      >
        <FocusTrap
          ref={this.focusTrapNode}
          active={this.state.focusable}
          focusTrapOptions={{
            onDeactivate: this.handleLeaveEvent,
            clickOutsideDeactivates: true
          }}
        >
          {this.renderDrawerFrontMatter(this.props)}
          {this.props.connected && (
            <Notifications scope="drawer" style="drawer" animate={false} />
          )}
          {/* Render children without props if they aren't a component */}
          {this.renderChildren()}
        </FocusTrap>
      </div>
    );
  }

  renderChildren() {
    if (!this.props.children) return null;
    if (isString(this.props.children.type)) return this.props.children;
    return React.cloneElement(this.props.children, {
      closeDrawer: this.handleLeaveEvent
    });
  }

  renderDrawerWrapper() {
    if (this.props.lockScroll === "hover") {
      return (
        <div className={this.props.identifier}>
          <Utility.EdgeLockScroll>{this.renderDrawer()}</Utility.EdgeLockScroll>
        </div>
      );
    }
    if (this.props.lockScroll === "always") {
      return (
        <div>
          <Utility.LockBodyScroll>
            <div className={this.props.identifier}>
              <div
                className="drawer-overlay"
                onClick={this.handleLeaveEvent}
                role="button"
                tabIndex="0"
              />
              {this.renderDrawer()}
            </div>
          </Utility.LockBodyScroll>
        </div>
      );
    }

    return this.renderDrawer();
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="drawer"
        // True value required to enable transform
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {this.props.open ? this.renderDrawerWrapper() : null}
      </ReactCSSTransitionGroup>
    );
  }
}
