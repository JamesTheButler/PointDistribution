import React, { Component } from "react";

import "./CustomSlider.css";

const CAPTION_ID_SUFFIX = "-caption";
const INPUT_ID_SUFFIX = "-slider";
const VALUE_FIELD_ID_SUFFIX = "-slider-value";

export default class CustomSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      value: this.props.defaultValue ? this.props.defaultValue : Math.floor((parseInt(this.props.min) + parseInt(this.props.max)) / 2),
    };
  }

  updateValueLabel(val) {
    document.getElementById(this.state.id + VALUE_FIELD_ID_SUFFIX).innerHTML = val;
  }

  componentDidMount() {
    this.updateValueLabel(this.state.value);
  }

  onValueChanged(changeEvent) {
    // update internal value state
    let newVal = changeEvent.target.value;
    this.setState({ value: newVal });
    // call on change hook
    this.props.onChange(newVal);
    // update text of label
    if (this.props.updateValueLabelOverwrite != null) {
      this.props.updateValueLabelOverwrite(newVal);
    } else {
      this.updateValueLabel(newVal);
    }
  }

  render() {
    const { caption, id, min, defaultValue, max, step } = this.props;
    return (
      <div id={this.props.id} className="d-flex">
        <div id={this.props.id + CAPTION_ID_SUFFIX} className="custom-slider col-3">
          {caption}
        </div>
        <input
          type="range"
          id={id + INPUT_ID_SUFFIX}
          min={min}
          defaultValue={defaultValue}
          max={max}
          step={step}
          className="slider col-6"
          onChange={(changeEvent) => this.onValueChanged(changeEvent)}
        />
        <div id={id + VALUE_FIELD_ID_SUFFIX} className="col-3">
          {defaultValue}
        </div>
      </div>
    );
  }
}

CustomSlider.defaultProps = {
  caption: "default slider caption",
  id: "default",
  min: 0,
  max: 10,
  step: 1,
  onChange: null,
  updateValueLabel: null,
};
