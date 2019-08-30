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
    onChange: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired
  };

  static defaultProps = {
    width: 600,
    visible: false,
    loading: false
  };

  // 关闭弹窗
  leaveModal = () => {
    const { onClose } = this.props;
    onClose && onClose();
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
        onCancel={this.leaveModal}
        onOk={this.confirmAction}
        confirmLoading={loading}
        okText='确认'
        cancelText='取消'>
        <FormComponent ref={this.formRef} {...restProps} />
      </Modal>
    );
  }
}

export default ModalForm;
