import React, { useState } from "react";
import { Button } from "antd";
import UForm from "uform";
import "uform/dist/uform.css";

function ModalForm() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    name: "",
    size: 1,
    city: 0,
    area: "郊区",
    password: "",
    choosen: true,
    confirm: true,
    rate: 3,
    describe: ""
  });
  const fields = [
    {
      name: "name",
      label: "名称",
      type: "input",
      placeholder: "请输入名称",
      rules: [
        {
          required: true,
          message: "请输入名称"
        }
      ]
    },
    {
      name: "size",
      label: "大小",
      type: "inputNumber",
      placeholder: "请输入大小",
      rules: [
        {
          required: true,
          message: "请输入名称"
        }
      ]
    },
    {
      name: "city",
      label: "城市",
      type: "select",
      fieldData: [
        {
          name: "北京",
          value: 0
        },
        {
          name: "上海",
          value: 1
        },
        {
          name: "杭州",
          value: 2
        },
        {
          name: "深圳",
          value: 3
        }
      ],
      rules: [
        {
          required: true,
          message: "请输入名称"
        }
      ]
    },
    {
      name: "area",
      label: "地区",
      type: "radio",
      fieldData: ["城区", "郊区"]
    },
    {
      name: "confirm",
      label: "确认选择",
      type: "checkbox",
      rules: [
        {
          required: true,
          message: "请确认选择"
        }
      ]
    },
    {
      name: "custom",
      label: "自定义项",
      type: "custom",
      node: (
        <div>
          <h2>自定义表单项</h2>
        </div>
      )
    },
    {
      name: "password",
      label: "密码",
      type: "password",
      rules: [
        {
          required: true,
          message: "请输入密码"
        }
      ]
    },
    {
      name: "choosen",
      label: "是否选择",
      type: "switch",
      checkedChildren: "开",
      unCheckedChildren: "关",
      rules: [
        {
          required: true,
          message: "请输入密码"
        }
      ]
    },
    {
      name: "rate",
      label: "评分",
      type: "rate"
    },
    {
      name: "describe",
      label: "描述",
      type: "textarea",
      placeholder: "请输入描述"
    }
  ];
  const onChange = (result) => {
    setData({
      ...data,
      ...result
    });
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  const onCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className='button-container'>
        <Button
          type='primary'
          onClick={() => {
            setVisible(true);
          }}>
          打开弹窗表单
        </Button>
      </div>
      <UForm
        type='modal'
        visible={visible}
        title='新建表单'
        data={data}
        fields={fields}
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
}

const ModalFormCode = `
import React, { useState } from "react";
import { Button } from "antd";
import UForm from "uform";
import "uform/dist/uform.css";

function ModalForm() {
  const { visible, setVisible } = useState(false);
  const [data, setData] = useState({
    name: "",
    size: 1,
    city: 0,
    area: "郊区",
    password: "",
    choosen: true,
    confirm: true,
    rate: 3,
    describe: ""
  });
  const fields = [
    {
      name: "name",
      label: "名称",
      type: "input",
      placeholder: "请输入名称",
      rules: [
        {
          required: true,
          message: "请输入名称"
        }
      ]
    },
    {
      name: "size",
      label: "大小",
      type: "inputNumber",
      placeholder: "请输入大小",
      rules: [
        {
          required: true,
          message: "请输入名称"
        }
      ]
    },
    {
      name: "city",
      label: "城市",
      type: "select",
      fieldData: [
        {
          name: "北京",
          value: 0
        },
        {
          name: "上海",
          value: 1
        },
        {
          name: "杭州",
          value: 2
        },
        {
          name: "深圳",
          value: 3
        }
      ],
      rules: [
        {
          required: true,
          message: "请输入名称"
        }
      ]
    },
    {
      name: "area",
      label: "地区",
      type: "radio",
      fieldData: ["城区", "郊区"]
    },
    {
      name: "confirm",
      label: "确认选择",
      type: "checkbox",
      rules: [
        {
          required: true,
          message: "请确认选择"
        }
      ]
    },
    {
      name: "custom",
      label: "自定义项",
      type: "custom",
      node: (
        <div>
          <h2>自定义表单项</h2>
        </div>
      )
    },
    {
      name: "password",
      label: "密码",
      type: "password",
      rules: [
        {
          required: true,
          message: "请输入密码"
        }
      ]
    },
    {
      name: "choosen",
      label: "是否选择",
      type: "switch",
      checkedChildren: "开",
      unCheckedChildren: "关",
      rules: [
        {
          required: true,
          message: "请输入密码"
        }
      ]
    },
    {
      name: "rate",
      label: "评分",
      type: "rate"
    },
    {
      name: "describe",
      label: "描述",
      type: "textarea",
      placeholder: "请输入描述"
    }
  ];
  const onChange = (result) => {
    setData({
      ...data,
      ...result
    });
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  const onCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button
        type='primary'
        onClick={() => {
          setVisible(true);
        }}>
        打开弹窗表单
      </Button>
      <div style={{ width: 600, marginLeft: 100 }}>
        <UForm
          type="modal"
          visible={visible}
          title='新建表单'
          data={data}
          fields={fields}
          onChange={onChange}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
`;

export { ModalFormCode };

export default ModalForm;
