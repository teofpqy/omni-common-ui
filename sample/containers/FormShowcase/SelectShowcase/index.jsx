import React, { Component } from 'react';
import { Form } from 'omni-common-ui';

const optionNormal = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', clearableValue: false },
];

const optionRequired = [
  { value: 'three', label: 'three' },
  { value: 'four', label: 'four' },
];

class SelectShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>
      <Form.Select
        options={optionNormal}
        name="normalSelect"
        label="Normal Select"
        value={this.state.normal} />
      <Form.Select
        options={optionRequired}
        name="requiredSelect"
        label="Required Select"
        value={this.state.required}
        required />
    </div>;
  }
}

export default SelectShowcase;
