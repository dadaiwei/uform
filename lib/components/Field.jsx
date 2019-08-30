import * as React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Form, Input, InputNumber, Select, Radio, Checkbox, Switch, Rate } from "antd";
import { getFieldLabelValue } from "../util/index";

class Field extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };

  // Input
  renderInput = (name, restFieldProps) => {
    return (
      <Input {...restFieldProps} onChange={(e) => this.onChange({ [name]: e.target.value })} />
    );
  };

  // InputNumber
  renderInputNumber = (name, restFieldProps) => {
    return (
      <InputNumber {...restFieldProps} onChange={(value) => this.onChange({ [name]: value })} />
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
    const { fieldData, ...restSelectProps } = restFieldProps;
    const { fieldLabel, fieldValue } = getFieldLabelValue(fieldData);
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
    const { fieldData, ...restRadioProps } = restFieldProps;
    const { fieldLabel, fieldValue } = getFieldLabelValue(fieldData);
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

  // Checkbox
  renderCheckbox = (name, restFieldProps) => {
    return (
      <Checkbox {...restFieldProps} onChange={(e) => this.onChange({ [name]: e.target.checked })} />
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

  // Switch
  renderSwitch = (name, restFieldProps) => {
    return (
      <Switch
        {...restFieldProps}
        onChange={(checked) => this.onChange({ [name]: checked })}></Switch>
    );
  };

  // Rate
  renderRate = (name, restFieldProps) => {
    return (
      <Rate {...restFieldProps} onChange={(number) => this.onChange({ [name]: number })}></Rate>
    );
  };

  // 自定义表单项
  renderCustom = (restFieldProps) => {
    const { node } = restFieldProps;
    return <React.Fragment>{node}</React.Fragment>;
  };

  // 渲染表单项
  renderField = (fieldProps) => {
    const { name, type, ...restFieldProps } = fieldProps;
    switch (type) {
      case "input":
        return this.renderInput(name, restFieldProps);
      case "inputNumber":
        return this.renderInputNumber(name, restFieldProps);
      case "textarea":
        return this.renderTextArea(name, restFieldProps);
      case "select":
        return this.renderSelect(name, restFieldProps);
      case "radio":
        return this.renderRadio(name, restFieldProps);
      case "checkbox":
        return this.renderCheckbox(name, restFieldProps);
      case "password":
        return this.renderPassword(name, restFieldProps);
      case "switch":
        return this.renderSwitch(name, restFieldProps);
      case "rate":
        return this.renderRate(name, restFieldProps);
      case "custom":
        return this.renderCustom(restFieldProps);
      default:
        return null;
    }
  };

  // 表单项变化
  onChange = (value) => {
    const { onChange, form } = this.props;
    onChange && onChange({ ...value, form });
  };

  // handleFieldValue
  handleDecoratorProps = (type, value, decoratorProps) => {
    switch (type) {
      case "switch":
      case "checkbox":
        decoratorProps.valuePropName = value ? "checked" : "";
        break;
      default:
        break;
    }
  };

  render() {
    const { data, fieldProps, getFieldDecorator } = this.props;
    const { label, name, type, rules, ...restFieldProps } = fieldProps;
    const decoratorProps = {
      rules: rules || []
    };
    const value = get(data, name, undefined);
    decoratorProps.initialValue = value;
    this.handleDecoratorProps(type, value, decoratorProps);
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
