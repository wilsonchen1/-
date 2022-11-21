import { message, Modal, Space } from "antd";
import axios from "axios";
import React from "react";
import Edit from "./edituser";

type DataType = {
  id: number;
  key: string;
  name: string;
  sex: string;
  major: string;
  grade: string;
  email: string;
  phonenumber: string;
  headimg: string;
};
interface Iprops {//中间接口，承接edituser和table
  //
  prop: DataType;
  Delete: (arr: any) => void;
  Edit:(arr:any)=>void
}

const View: React.FC<Iprops> = (props: Iprops) => {
  const fastdelete = (stuinfo: Iprops) => {
    Modal.confirm({
      title: "删除内容",
      content: "确认删除该用户吗？",
      onOk: () => {//做一个消息框。如果确定再发请求删除
        axios
          .post("/api/students/delete", {
            name: stuinfo.prop.name,
          })
          .then((res) => {
            console.log(res.data.students);
            stuinfo.Delete(res.data.students);
            message.success("删除成功！");
          });
      },
    });
  };
  return (
    <>
    <Space>
      <a
        onClick={(e) => {
          e.preventDefault();
          fastdelete(props);
        }}
      >
        删除
      </a>
      <Edit Edit={props.Edit} prop={props.prop}></Edit>
      </Space>
    </>
  );
};

export default View;
