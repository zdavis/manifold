import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {fetchTexts} from 'reader/actions/entities';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import GlobalError from 'reader/components/smart/GlobalError';

class TextListComponent extends Component {

  static propTypes() {
    return {
      actions: React.PropTypes.shape({
        fetchTexts: React.PropTypes.func.isRequired
      }),
      texts: React.PropTypes.array
    };
  }

  componentDidMount() {
    this.props.actions.fetchTexts();
  }

  render() {

    const styles = {
      cover: {
        maxWidth: 200,
        height: 200,
        display: 'block',
        margin: 'auto',
        marginBottom: 25
      },
      placeholder: {
        backgroundColor: '#BBB',
        width: 150
      },
      list: {
        width: '75%',
        margin: '50px auto',
        padding: 0,
        listStyleType: 'none'
      },
      item: {
        minWidth: 200,
        padding: 25,
        display: 'block',
        float: 'left',
        width: '33%',
        textAlign: 'center'
      }
    };

    return (
      <div>
        <GlobalError />
        <ul style={styles.list} >
          {Object.values(this.props.texts).map(function(text) {
            return (
              <li key={text.id} style={styles.item}  >
              <Link to={`/text/${text.id}`}>
              {(() => {
                if(text.attributes.coverUrl) {
                  return <img src={text.attributes.coverUrl} style={styles.cover} />;
                } else {
                  return <div style={Object.assign({}, styles.cover, styles.placeholder)} />;
                }
              })()}
              {text.attributes.title}
              </Link>
              </li>
            );
          }
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    texts: state.entities.texts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchTexts}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextListComponent);


