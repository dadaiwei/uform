import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import FormComponent from "./FormComponent";

class NormalForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  static propTypes = {
    layout: PropTypes.string,
    formItemLayout: PropTypes.object,
    tailFormItemLayout: PropTypes.object,
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    showConfirmButton: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    showResetButton: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func,
    onCancel: PropTypes.func
  };

  // 表单提交
  handleSubmit = () => {
    this.formRef.current.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { onSubmit } = this.props;
        onSubmit && onSubmit(values);
      }
    });
  };

  // 取消表单提交
  cancelSubmit = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  render() {
    const {
      tailFormItemLayout,
      showConfirmButton,
      showCancelButton,
      showResetButton,
      ...restProps
    } = this.props;
    const hasTailFormItem = showConfirmButton || showCancelButton || showResetButton;
    return (
      <FormComponent ref={this.formRef} {...restProps}>
        {hasTailFormItem && (
          <Form.Item {...tailFormItemLayout}>
            {showConfirmButton && (
              <Button type='primary' htmlType='submit' onClick={this.handleSubmit}>
                确定
              </Button>
            )}
            {showCancelButton && (
              <Button className='normal-form-button' onClick={this.cancelSubmit}>
                取消
              </Button>
            )}
          </Form.Item>
        )}
      </FormComponent>
    );
  }
}

export default NormalForm;
