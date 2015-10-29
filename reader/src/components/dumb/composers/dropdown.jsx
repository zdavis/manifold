import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function dropdown(Composed) {

  class Dropdown extends Component {

    static propTypes() {
      return {
        actions: React.PropTypes.shape({
          lowerCurtain: React.PropTypes.func.isRequired,
          raiseCurtain: React.PropTypes.func.isRequired
        })
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        active: false
      };
      this.handler = null;
      this.__outsideClickHandler = null;
    }

    componentDidMount() {
      this.__outsideClickHandler = ((e) => {
        this.__handleClick(e);
      });
      this.enableOnClickOutside();
    }

    componentWillUnmount() {
      this.disableOnClickOutside();
      this.__outsideClickHandler = false;
      this.handler = null;
    }

    __handleClick(e) {
      const node = ReactDOM.findDOMNode(this);
      let source = e.target;
      let found = false;
      while(source.parentNode) {
        found = this.__isSourceFound(source, node);
        if(found) return;
        source = source.parentNode;
      }
      if(!found) this.__handleClickOutside();
    }

    __handleClickOutside() {
      if(this.state.active == true) {
        this.close();
      }
    }

    __isSourceFound(source, localNode) {
      if(source == localNode) {
        return true;
      }
      if(source.correspondingElement) {
        return source.correspondingElement.classList.contains('ignore-react-onclickoutside'); 
      }
      return source.classList.contains('ignore-react-onclickoutside');
    }

    enableOnClickOutside() {
      document.addEventListener("mousedown", this.__outsideClickHandler, false);
      document.addEventListener("touchstart", this.__outsideClickHandler, false);
    }

    disableOnClickOutside() {
      document.removeEventListener("mousedown", this.__outsideClickHandler);
      document.removeEventListener("touchstart", this.__outsideClickHandler);
    }

    close() {
      this.setState({active: false});
      this.props.actions.lowerCurtain();
    }

    open() {
      this.setState({active: true});
      this.props.actions.raiseCurtain();
    }

    toggle() {
      if(this.state.active) {
        this.close();
      } else {
        this.open();
      }
    }

    render() {
      return (
        <Composed toggleCallback={(e, trigger) => { this.toggle(event, trigger);}} {...this.props} {...this.state} />
      );
    }
  }

  return Dropdown;

}



