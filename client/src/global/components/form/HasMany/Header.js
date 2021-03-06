import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Instructions from "../Instructions";

export default class FormHasManyHeader extends PureComponent {
  static displayName = "Form.HasMany.Header";

  static propTypes = {
    label: PropTypes.string.isRequired,
    labelTag: PropTypes.oneOf(["div", "h2", "h3", "h4"]),
    labelHeader: PropTypes.bool,
    instructions: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    idForInstructions: PropTypes.string,
    labelId: PropTypes.string.isRequired
  };

  static defaultProps = {
    labelTag: "div"
  };

  get labelTag() {
    return this.props.labelTag;
  }

  renderLabelHeader(label, instructions, idForInstructions, id) {
    return (
      <>
        <header id={id} className="section-heading-secondary">
          <h3>{label}</h3>
        </header>
        <Instructions instructions={instructions} id={idForInstructions} />
      </>
    );
  }

  renderHeader(label, instructions, idForInstructions, id) {
    const Header = props => (
      <this.labelTag id={id} className="form-input-heading">
        {props.children}
      </this.labelTag>
    );

    return (
      <>
        <Header>{label}</Header>
        <Instructions instructions={instructions} id={idForInstructions} />
      </>
    );
  }

  render() {
    const { label, instructions, idForInstructions, labelId: id } = this.props;
    if (!label) return null;

    return this.props.labelHeader
      ? this.renderLabelHeader(label, instructions, idForInstructions, id)
      : this.renderHeader(label, instructions, idForInstructions, id);
  }
}
