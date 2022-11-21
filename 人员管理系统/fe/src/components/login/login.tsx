import "./login.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate(); //路由跳转
  const navigateTo = (path: string) => {
    navigate(path);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
    axios
      .post("/api/user/login", {
        //向服务器发送用户名和密码
        user: values.username,
        pwd: values.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          message.success(response.data.message); //后端登录成功的反馈
          navigateTo("/"); //登陆成功则跳转
        } else {
          message.error(response.data.message);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <img src="../logohuake.png" />
      <Form
        title="人员管理系统"
        className="login"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="h1">人员管理系统</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
