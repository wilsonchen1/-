import {  Popconfirm, Avatar, Space, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
const UserAvatar: React.FC = () => {
  const navigate = useNavigate(); //路由跳转，给退出登录时重定向返回登陆页面
  const navigateTo = (path: string) => {
    navigate(path);
  };
  //这是气泡提醒组件，基本照抄antd，调了一下格式
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    //在这里向服务端提交退出登录请求，重定向到登录页面
    setConfirmLoading(true);
    axios.post("/api/user/logout").then((res) => {
      if (res.data.code === 0) {
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          message.success("退出成功");
          navigateTo("/login");
        }, 1500);
      } else {
        message.error("你好像没有登录，请先登录！");
      }
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Popconfirm
        title="退出登录？"
        okText="好"
        cancelText="不"
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <div id="admin" className="admin">
          <Space>
            <div>admin</div>
            <Avatar
              onClick={showPopconfirm}
              src="https://tse1-mm.cn.bing.net/th/id/OIP-C.vS3mNNO7rWdIjDlwVgzwzAAAAA?pid=ImgDet&rs=1"
            />
          </Space>
        </div>
      </Popconfirm>
    </>
  );
};

export default UserAvatar;
