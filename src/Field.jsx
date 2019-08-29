import * as React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Form, Input, Select, Radio } from "antd";

class Field extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
    getFieldDecorator: PropTypes.func.isRequired
  };

  // Input
  renderInput = (name, restFieldProps) => {
    return (
      <Input {...restFieldProps} onChange={(e) => this.onChange({ [name]: e.target.value })} />
    );
  };

  // Textarea
  renderTextArea = (name, restFieldProps) => {
    return (
      <Input.TextArea
        {...restFieldProps}
        onChange={(e) => this.onChange({ [name]: e.target.value })}
      />
    );
  };

  // Select
  renderSelect = (name, restFieldProps) => {
    const { fieldData, fieldLabel, fieldValue, ...restSelectProps } = restFieldProps;
    return (
      <Select
        showSearch
        optionFilterProp='children'
        onChange={(value) => this.onChange({ [name]: value })}
        {...restSelectProps}>
        {(fieldData || []).map((item, index) => {
          const label = get(item, fieldLabel, item);
          const value = get(item, fieldValue, item);
          return (
            <Select.Option key={index} value={value}>
              {label}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  // Radio
  renderRadio = (name, restFieldProps) => {
    const { fieldData, fieldLabel, fieldValue, ...restRadioProps } = restFieldProps;
    return (
      <Radio.Group {...restRadioProps} onChange={(e) => this.onChange({ [name]: e.target.value })}>
        {(fieldData || []).map((item) => {
          const label = get(item, fieldLabel, item);
          const value = get(item, fieldValue, item);
          return (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  };

  // Password
  renderPassword = (name, restFieldProps) => {
    return (
      <Input.Password
        {...restFieldProps}
        onChange={(e) => this.onChange({ [name]: e.target.value })}
      />
    );
  };

  // 自定义表单项
  renderCustom = (name, restFieldProps) => {
    const { node } = restFieldProps;
    return <React.Fragment>{node}</React.Fragment>;
  };

  // 渲染表单项
  renderField = (fieldProps) => {
    const { name, type, ...restFieldProps } = fieldProps;
    if (type === "input") {
      return this.renderInput(name, restFieldProps);
    } else if (type === "textarea") {
      return this.renderTextArea(name, restFieldProps);
    } else if (type === "select") {
      return this.renderSelect(name, restFieldProps);
    } else if (type === "radio") {
      return this.renderRadio(name, restFieldProps);
    } else if (type === "password") {
      return this.renderPassword(name, restFieldProps);
    } else if (type === "custom") {
      return this.renderCustom(name, restFieldProps);
    } else {
      return null;
    }
  };

  onChange = (value) => {
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  render() {
    const { data, fieldProps, getFieldDecorator } = this.props;
    const { label, name, type, rules, ...restFieldProps } = fieldProps;
    const decoratorProps = {
      rules: rules || []
    };
    const value = get(data, name, undefined);
    decoratorProps.initialValue = value;
    return (
      <Form.Item label={label}>
        {getFieldDecorator(name, decoratorProps)(
          this.renderField({
            name,
            type,
            ...restFieldProps
          })
        )}
      </Form.Item>
    );
  }
}

export default Field;
