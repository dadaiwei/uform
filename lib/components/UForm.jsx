import * as React from "react";
import PropTypes from "prop-types";
import NormalForm from "./NormalForm";
import ModalForm from "./ModalForm";
import "../css/main.css";

class UForm extends React.Component {
  static propTypes = {
    type: PropTypes.string, // 表单类型，type-normal/modal
    layout: PropTypes.string, // 表单布局，horizontal/vertical/inline
    visible: PropTypes.bool, // modal form是否课件
    labelCol: PropTypes.number, // formItem label部分占宽
    wrapperCol: PropTypes.number, // formItem内容部分占宽
    data: PropTypes.object.isRequired, // data
    fields: PropTypes.array.isRequired, // fields
    showConfirmButton: PropTypes.bool, // 展示确认按钮
    showResetButton: PropTypes.bool, // 展示重置按钮
    showCancelButton: PropTypes.bool, // 展示取消按钮
    onChange: PropTypes.func, // 修改表单回调
    onSubmit: PropTypes.func.isRequired, // 提交回调
    onCancel: PropTypes.func // 取消回调
  };

  static defaultProps = {
    type: "normal",
    layout: "horizontal",
    visible: false,
    labelCol: 4,
    wrapperCol: 16,
    data: {},
    fields: [],
    showConfirmButton: true,
    showCancelButton: true
  };

  // 渲染表单，区分弹窗表单和正常表单
  renderForm = (type) => {
    const { layout, labelCol, wrapperCol } = this.props;
    let formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: labelCol }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: wrapperCol }
      }
    };
    let tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: wrapperCol, offset: labelCol }
      }
    };
    if (layout !== "horizontal") {
      formItemLayout = null;
      tailFormItemLayout = null;
    }
    switch (type) {
      case "normal":
        return (
          <NormalForm
            {...this.props}
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
          />
        );
      case "modal":
        return <ModalForm {...this.props} formItemLayout={formItemLayout}></ModalForm>;
      default:
        return <NormalForm {...this.props} />;
    }
  };

  render() {
    const { type } = this.props;
    return <React.Fragment>{this.renderForm(type)}</React.Fragment>;
  }
}

export default UForm;
