import * as React from "react";
import { Form } from "antd";
import PropTypes from "prop-types";
import Field from "./Field";

class UForm extends React.Component {
  static propTypes = {
    layout: PropTypes.string,
    labelCol: PropTypes.number,
    visible: PropTypes.bool,
    wrapperCol: PropTypes.number,
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired
  };

  static defaultProps = {
    layout: "horizontal", // 表单布局
    labelCol: 4, // label宽度
    wrapperCol: 19, // 表单项宽度
    data: {}, // 数据
    fields: [] // 表单项
  };

  componentWillReceiveProps() {
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
    const { layout, labelCol, wrapperCol, data, fields, form, onChange } = this.props;
    const { getFieldDecorator } = form;
    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: labelCol }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: wrapperCol }
      }
    };
    return (
      <React.Fragment>
        <Form layout={layout} {...formLayout}>
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
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create({})(UForm);
