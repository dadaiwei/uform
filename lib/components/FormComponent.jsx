import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import Field from "./Field";
import get from "lodash/get";

class FormComponent extends Component {
  static propTypes = {
    layout: PropTypes.string,
    formItemLayout: PropTypes.object,
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    onChange: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    // 打开弹窗时，重置表单
    if (nextProps.visible && nextProps.visible !== this.props.visible) {
      this.props.form.resetFields();
    }
    if (nextProps.data !== this.props.data) {
      const fields = this.props.fields;
      fields.forEach((field) => {
        const fieldName = field.name;
        const nextFieldValue = get(nextProps.data, fieldName, "");
        const preFieldValue = get(this.props.data, fieldName, "");
        if (nextFieldValue !== preFieldValue) {
          this.props.form.setFieldsValue({
            [fieldName]: nextFieldValue
          });
        }
      });
    }
  }

  render() {
    const { layout, formItemLayout, data, fields, form, onChange, children } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout={layout} {...formItemLayout}>
        {fields.map((item, index) => {
          return (
            <Field
              data={data}
              fieldProps={item}
              key={index}
              getFieldDecorator={getFieldDecorator}
              onChange={onChange}
            />
          );
        })}
        {children}
      </Form>
    );
  }
}

export default Form.create({})(FormComponent);
