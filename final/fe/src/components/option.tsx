import { SettingOutlined } from "@ant-design/icons";
import { message, Space } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { listContext } from "./table/table";

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
interface Iprops {
  //
  prop: DataType;
  Delete: (arr: any) => void;
}

const View: React.FC<Iprops> = (props: Iprops) => {
  const gotoinfo = (stuinfo: Iprops) => {
    //把数据传到
    alert(stuinfo.prop.id);
    // props.Delete()
    // console.log(stuinfo.prop.id)
  };
  const deleterequest = (stuinfo: Iprops) => {
    axios
      .post("/api/students/delete", {
        name: stuinfo.prop.name,
      })
      .then((res) => {
        console.log(res.data.students);
        stuinfo.Delete(res.data.students);
        message.success("删除成功！")
      });
  };
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        // gotoinfo(props);
        deleterequest(props);
      }}
    >
      点击删除
      {/* <SettingOutlined></SettingOutlined> */}
    </a>
  );
};

export default View;
