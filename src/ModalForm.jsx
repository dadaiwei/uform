import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import UForm from "./UForm";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(React.ReactNode)])
      .isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    clearData: PropTypes.bool.isRequired,
    width: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    confirmModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired
  };

  static defaultProps = {
    width: 600,
    clearData: true
  };

  // 关闭弹窗
  leaveModal = () => {
    const { closeModal } = this.props;
    closeModal && closeModal();
  };

  // 确认操作
  confirmAction = () => {
    this.formRef.current.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { confirmModal } = this.props;
        confirmModal && confirmModal();
      }
    });
  };

  render() {
    const { title, width, visible, loading, data, fields, onChange } = this.props;
    return (
      <Modal
        title={title}
        width={width}
        visible={visible}
        closable
        zIndex={1001}
        onCancel={this.leaveModal}
        onOk={this.confirmAction}
        confirmLoading={loading}
        okText='确认'
        cancelText='取消'>
        <UForm
          data={data}
          visible={visible}
          fields={fields || []}
          ref={this.formRef}
          onChange={onChange}
        />
      </Modal>
    );
  }
}

export default ModalForm;
