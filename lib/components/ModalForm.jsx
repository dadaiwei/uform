import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import FormComponent from "./FormComponent";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(React.ReactNode)])
      .isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    width: PropTypes.number,
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    width: 600,
    visible: false,
    loading: false
  };

  // 关闭弹窗
  leaveModal = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  // 确认操作
  confirmAction = () => {
    this.formRef.current.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { onSubmit } = this.props;
        onSubmit && onSubmit();
      }
    });
  };

  render() {
    const { title, width, visible, loading, ...restProps } = this.props;
    return (
      <Modal
        className='form-modal'
        title={title}
        width={width}
        visible={visible}
        closable
        okText='确认'
        cancelText='取消'
        confirmLoading={loading}
        onCancel={this.leaveModal}
        onOk={this.confirmAction}>
        <FormComponent ref={this.formRef} {...restProps} />
      </Modal>
    );
  }
}

export default ModalForm;
