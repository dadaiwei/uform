# uform

基于 antd 表单实现的自定义表单，简单实用，支持常用表单及弹窗表单，支持`Input`、`InputNumber`、`Textarea`、`Select`、`Radio`、`Checkbox`、`Password`、`Switch`、`Rate`、`custom（自定义ReactNode）`。

## 1.常用表单

data 属性——表单项及值

```
const data = {
    name: "",
    size: 1,
    city: 0,
    area: "郊区",
    password: "",
    choosen: true,
    confirm: true,
    rate: 3,
    describe: ""
  };
```

field 属性——表单项 FormItem，其中 type 为 select、radio 传 fieldData（选择项）。

```
const fields = [
    {
      name: "name", // field name值，与data中key一一对应
      label: "名称", // field label值
      type: "input", // field type字段
      placeholder: "请输入名称",
      rules: [ // 表单限制规则
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
```

使用 UForm 组件

```
 const onChange = (result) => { // 表单修改
  console.log(result);
  };
  const onSubmit = (value) => { // 表单提交
    console.log(value);
  };
  const onCancel = () => { // 取消回调
  };

  return(
    <div>
      <UForm
        data={data}
        fields={fields}
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
```
