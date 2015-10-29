import React, { Component } from 'react';
import GlobalError from 'components/smart/GlobalError';
import Header from 'components/dumb/Header';
import TextSection from 'components/dumb/TextSection';
import Toc from 'components/dumb/Toc';
import TextNav from 'components/dumb/TextNav';
import {fetchOneText} from 'actions/entities';
import {lowerCurtain, raiseCurtain} from 'actions/curtain';
import {toggleTextNav} from 'actions/ui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { pushState } from 'redux-router';
import {currentText, currentTextSections, currentSection} from 'selectors/text.js';

export default class ReaderComponent extends Component {

  static propTypes() {
    return {
      text: React.PropTypes.object,
      section: React.PropTypes.object,
      actions: React.PropTypes.shape({
        fetchOneText: React.PropTypes.func.isRequired,
        pushState: React.PropTypes.func.isRequired
      }),
      params: React.PropTypes.shape({
        textId: React.PropTypes.number,
        docId: React.PropTypes.number
      })
    };
  }

  componentDidMount() {
    this.props.actions.fetchOneText(this.props.params.textId);
    this.redirectIfNoDoc();
  }

  componentDidUpdate() {
    this.redirectIfNoDoc();
  }

  redirectIfNoDoc() {
    if(this.props.text && !this.props.params.sectionId && this.props.text.attributes.textSections) {
      const path = `/text/${this.props.text.id}/toc`;
      this.props.actions.pushState(null, path);
    }
  }

  render() {

    let textSection = null;
    let toc = null;

    if(this.props.text) {
      if(this.props.params.sectionId) {
        textSection = <TextSection locationHash={this.props.location.hash} section={this.props.section} />;
      } else {
        toc = <Toc text={this.props.text} sections={this.props.sections} actions={this.props.actions} />;
      }
    }

    if(this.props.ui.textNavOpen) {
      return (
          <div>
            <Header {...this.props} />
            <TextNav actions={this.props.actions} text={this.props.text}/>
          </div>
      );
    } else {
      return (
          <div>
            <Header {...this.props} />
            {textSection}
            {toc}
            <GlobalError />
          </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    text: currentText(state),
    ui: state.ui,
    sections: currentTextSections(state),
    section: currentSection(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchOneText, toggleTextNav, lowerCurtain, raiseCurtain, pushState}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderComponent);
