import React, { Component, PropTypes } from 'react';
import { Form } from 'components/backend';
import setter from './setter';
import classnames from 'classnames';
import { Form as GlobalForm } from 'components/global';
import generatePassword from 'password-generator';

class FormGeneratedPasswordInput extends Component {

  static displayName = "Form.GeneratedPasswordInput";

  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    focusOnMount: PropTypes.bool,
    errors: PropTypes.array,
    set: PropTypes.func
  };

  static defaultProps = {
    focusOnMount: false,
    password: false
  };

  constructor(props) {
    super(props);
    this.state = {
      password: this.generatePassword(),
      showPassword: false
    };
  }

  componentDidMount() {
    if (this.props.focusOnMount === true && this.inputElement) this.inputElement.focus();
    this.setValueFromCurrentState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) this.setValueFromCurrentState();
  }

  setValueFromCurrentState() {
    const password = this.state.password;
    const { set } = this.props;
    set(password);
  }

  togglePassword(event) {
    event.preventDefault();
    this.setState({ showPassword: !this.state.showPassword });
  }

  generatePassword() {
    return generatePassword(16, false);
  }

  handlePasswordChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ password: value });
  }

  renderInput() {
    const inputClass = classnames({
      hidden: !this.state.showPassword
    });

    return (
      <input
        className={inputClass}
        ref={(input) => { this.inputElement = input; }}
        type="text"
        placeholder={"Enter a password"}
        onChange={(event) => this.handlePasswordChange(event)}
        value={this.state.password}
      />
    );
  }

  render() {
    const iconClass = classnames({
      manicon: true,
      "manicon-eye-outline": !this.state.showPassword,
      "manicon-eye-slash": this.state.showPassword
    });

    return (
      <GlobalForm.Errorable
        className="form-input password-input"
        name={this.props.name}
        errors={this.props.errors}
        label="Password"
      >
        <label>Password</label>
        <button
          className="password-visibility-toggle"
          onClick={(event) => this.togglePassword(event)}
        >
          <i className={iconClass}></i>
        </button>
        {this.renderInput()}
      </GlobalForm.Errorable>
    );
  }
}

export default setter(FormGeneratedPasswordInput);
