import React, { useState } from "react";
import { Icon } from "antd";
import Hightlight from "react-highlight.js";

function CodeBlock(props) {
  const { children, code } = props;
  const [collapse, setCollapse] = useState(true);
  return (
    <div className='code-box'>
      <div className='code-html'>{children}</div>
      <div className='code-collapse-box'>
        <div className='code-collapse' onClick={() => setCollapse(!collapse)}>
          {collapse ? (
            <div>
              <Icon type='caret-down' style={{ marginRight: 5 }} />
              展开代码
            </div>
          ) : (
            <div>
              <Icon type='caret-up' style={{ marginRight: 5 }} />
              收起代码
            </div>
          )}
        </div>
      </div>
      <div className='code-block' style={{ height: collapse ? 0 : 600 }}>
        <Hightlight className='code' language='javascript'>
          {code}
        </Hightlight>
      </div>
    </div>
  );
}

export default CodeBlock;
