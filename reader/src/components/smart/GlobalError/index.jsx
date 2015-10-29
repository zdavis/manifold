import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {clearError} from 'actions/error';
import {connect} from 'react-redux';

class GlobalErrorComponent extends Component {

  static propTypes() {
    return {
      actions: React.PropTypes.shape({
        clearError: React.PropTypes.func.isRequired
      }),
      error: React.PropTypes.object
    };
  }

  render() {

    const styles = {
      container: {
        padding: '15px',
        background: '#FFCCCC',
        display: this.props.error.exists == true ? 'block' : 'none'
      },
      h6: {
        fontSize: '1em',
        margin: '0 0 10px 0'
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyleType: 'none'
      },
      li: {
        marginBottom: '5px'
      }
    };
    return (
      <div style={styles.container}>
        <h6 style={styles.h6}>{'Rats and Dogs! An Error!'}</h6>
        <ul style={styles.ul}>
          <li style={styles.li}>{'Status: '}{this.props.error.status}</li>
          <li style={styles.li}>{'Message: '}{this.props.error.statusText}</li>
          <li style={styles.li}>{'Failed Action: '}{this.props.error.action}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({clearError}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalErrorComponent);

