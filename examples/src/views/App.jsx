import React, { Component } from "react";
import Hightlight from "react-highlight.js";
import CodeBlock from "../components/CodeBlock";
import ApiBlock from "../components/ApiBlock";
import PageAnchor from "../components/PageAnchor";
import NormalForm, { NormalFormCode } from "./NormalForm";
import ModalForm, { ModalFormCode } from "./ModalForm";
import "antd/dist/antd.css";
import "../css/main.scss";
import "../css/hightlight.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.componentStep = `<UForm 
    data={data}
    fields={fields}
    onChange={onChange}
    onCancel={onCancel}
    onSubmit={onSubmit}
    />`;
    this.apiColumns = [
      {
        title: "属性",
        dataIndex: "attribute",
        key: "atttibute",
        width: 260,
        render: (text) => <div className='api-table-attribute'>{text}</div>
      },
      {
        title: "说明",
        dataIndex: "explain",
        key: "explain",
        width: 250
      },
      {
        title: "必填属性",
        dataIndex: "required",
        key: "required",
        width: 130,
        render: (text) => (
          <div
            style={{
              color: text === "true" ? "#7546c9" : "rgba(0,0,0,.65)",
              fontWeight: text === "true" ? "bold" : "normal"
            }}>
            {text}
          </div>
        )
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 200,
        render: (text) => <div className='api-table-type'>{text}</div>
      },
      {
        title: "可选值",
        dataIndex: "values",
        key: "values",
        render: (text) => <div className='api-table-values'>{text}</div>
      },
      {
        title: "默认值",
        dataIndex: "defaultValue",
        key: "defaultValue",
        width: 150
      }
    ];
    this.commonApi = [
      {
        key: "1",
        attribute: "type",
        explain: "使用通用表单或者弹框表单",
        required: "false",
        type: "string",
        values: "norma | modal",
        defaultValue: "normal"
      },
      {
        key: "2",
        attribute: "layout",
        required: "false",
        explain: "表单布局",
        type: "string",
        values: "horizontal | vertical | inline",
        defaultValue: "horizontal"
      },
      {
        key: "3",
        attribute: "labelCol",
        explain: "表单label占宽",
        required: "false",
        type: "number",
        values: "1-24之间整数",
        defaultValue: "4"
      },
      {
        key: "4",
        attribute: "wrapperCol",
        explain: "表单内容项占宽",
        required: "false",
        type: "number",
        values: "1-24之间整数，通常为24-labelCol",
        defaultValue: "16"
      },
      {
        key: "6",
        attribute: "loading",
        explain: "确定按钮 loading",
        required: "false",
        type: "boolean",
        values: "true | false",
        defaultValue: "false"
      },
      {
        key: "5",
        attribute: "data",
        explain: "表单数据",
        required: "true",
        type: "any[ ]",
        values: "-",
        defaultValue: "[ ]"
      },
      {
        key: "7",
        attribute: "fields",
        explain: "表单每一项特征描述",
        required: "true",
        type: "any[ ]",
        values: "-",
        defaultValue: "[ ]"
      },
      {
        key: "8",
        attribute: "onSubmit",
        explain: "表单提交回调",
        required: "true",
        type: "Function(values)",
        values: "-",
        defaultValue: "无"
      },
      {
        key: "9",
        attribute: "onChange",
        explain: "表单每一项修改回调",
        required: "false",
        type: "Function(value)",
        values: "-",
        defaultValue: "无"
      },
      {
        key: "10",
        attribute: "onCancel",
        explain: "表单取消回调",
        required: "false",
        type: "Function( )",
        values: "-",
        defaultValue: "无"
      }
    ];
    this.normalFormApi = [
      {
        key: "1",
        attribute: "showCancelButton",
        explain: "是否展示取消按钮",
        required: "false",
        type: "boolean",
        values: "true | false",
        defaultValue: "true"
      }
    ];
    this.modelFormApi = [
      {
        key: "1",
        attribute: "visible",
        required: "true",
        explain: "弹框是否可见",
        type: "boolean",
        values: "true | false",
        defaultValue: "true"
      },
      {
        key: "2",
        attribute: "title",
        required: "true",
        explain: "弹框标题",
        type: "string | ReactNode",
        values: "-",
        defaultValue: "无"
      }
    ];
    this.links = [
      {
        href: "#base-introduction",
        title: "基本介绍"
      },
      {
        href: "#use-guide",
        title: "使用指南"
      },
      {
        href: "#code-demonstration",
        title: "代码演示",
        children: [
          {
            href: "#normal-form",
            title: "通用表单"
          },
          {
            href: "#modal-form",
            title: "弹框表单"
          }
        ]
      },
      {
        href: "#api",
        title: "API",
        children: [
          {
            href: "#common-api",
            title: "公共API"
          },
          {
            href: "#normal-form-api",
            title: "通用表单独有API"
          },
          {
            href: "#modal-form-api",
            title: "弹框表单独有API"
          }
        ]
      }
    ];
  }
  render() {
    return (
      <div className='demo-container'>
        <PageAnchor links={this.links} />
        <h1 className='page-header'>
          UForm &nbsp;
          <a href='https://github.com/dadaiwei/uform' target='_blank'>
            View in Github
          </a>
        </h1>
        <div>
          <h2 id='base-introduction'>基本介绍</h2>
          <div className='description'>
            基于antd组件库定制的简单易用Form，支持通用表单及弹框表单两种形式，支持Input、InputNumber、Textarea、Select、Radio、Checkbox、Password、Switch、Rate、custom（自定义ReactNode）。
          </div>
        </div>
        <div>
          <h2 id='use-guide'>使用指南</h2>
          <div className='use-block'>
            <div className='step'>1.安装UForm依赖包</div>
            <div className='step-code'>
              <Hightlight language='javascript'>npm install uform --save-dev</Hightlight>
            </div>
            <div className='step'>2.引入依赖包</div>
            <div className='step-code'>
              <Hightlight language='javascript'>
                <div>import UForm from "uform";</div>
                <div>import "uform/dist/uform.css";</div>
              </Hightlight>
            </div>
            <div className='step'>3.使用UForm组件</div>
            <div className='step-code'>
              <Hightlight language='javascript'>{this.componentStep.trim()}</Hightlight>
            </div>
          </div>
        </div>

        <div>
          <h2 id='code-demonstration'>代码演示</h2>
          <div className='demo-box-container'>
            <div className='demo-box'>
              <h3 id='normal-form'>通用表单</h3>
              <CodeBlock code={NormalFormCode}>
                <NormalForm />
              </CodeBlock>
            </div>
          </div>
          <div className='demo-box-container'>
            <div className='demo-box modal-form-demo-box'>
              <h3 id='modal-form'>弹框表单</h3>
              <CodeBlock code={ModalFormCode}>
                <ModalForm />
              </CodeBlock>
            </div>
          </div>
        </div>
        <div className='api-container'>
          <h2 id='api'>API</h2>
          <h3 id='common-api'>公共API</h3>
          <div className='api-block'>
            <ApiBlock columns={this.apiColumns} data={this.commonApi} />
          </div>
          <h3 id='normal-form-api'>通用表单独有API</h3>
          <div className='api-block'>
            <ApiBlock columns={this.apiColumns} data={this.normalFormApi} />
          </div>
          <h3 id='modal-form-api'>弹框表单独有API</h3>
          <div className='api-block'>
            <ApiBlock columns={this.apiColumns} data={this.modelFormApi} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
