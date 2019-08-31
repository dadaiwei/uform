import React from "react";
import { Table } from "antd";

function ApiTable(props) {
  const data = props.data || [];
  const columns = props.columns || [];
  return <Table bordered columns={columns} dataSource={data} pagination={false}></Table>;
}

export default ApiTable;
