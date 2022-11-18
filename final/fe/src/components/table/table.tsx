import { Space, Table, Tag, Image, Button, message, Input } from "antd";
import "./table.css";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import MyModal from "../adduser";
import { useNavigate } from "react-router-dom";
import View from "../option";

export const listContext = React.createContext([]); //这里设置一个全局状态，便于写option.tsx

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

var STUDENTS: DataType[] = [];

const MyTable: React.FC = () => {
  const navigate = useNavigate(); //路由跳转
  const navigateTo = (path: string) => {
    //重定向函数
    navigate(path);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "头像",
      dataIndex: "headimg",
      key: "headimg",
      filterSearch: true,
      render: (_, record) => {
        return <Image height={66} width={80} src={record.headimg} />;
      },
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "性别",
      key: "sex",
      dataIndex: "sex",
      render: (sex) => {
        let color = sex === "男" ? "geekblue" : "volcano";
        return (
          <Tag color={color} key={sex}>
            {sex}
          </Tag>
        );
      },
    },
    {
      title: "电话",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    { title: "邮箱", dataIndex: "email", key: "email" },
    {
      title: "操作",
      key: "action",

      render: (_, record) => {
        //这里的组件来自option.tsx的View组件，可以查看学生具体信息

        const Delete=(arr:DataType[])=>{
          setStudentList(arr)
        }
        return (
          <>
            <View prop={record} Delete={Delete}></View>
          </>
        );
      },
    },
  ];
  const [studentlist, setStudentList] = useState(STUDENTS);
  const getStudents = () => {
    axios.get("/api/students").then((res) => {
      //从服务端获取所有学生信息
      if (res.data.code === -1) {
        message.error("无法查看信息，请先登录！");
        navigateTo("/login"); //如果后端验证没有登陆，那么跳转到登录页，并且不会展示信息，实现拦截
      }
      STUDENTS = res.data.students;
      setStudentList(STUDENTS);
    });
  };
  useEffect(() => {
    //不然会一直发请求
    getStudents();
  }, []);

  const { Search } = Input; //解构赋值获取Search,放在后面组件里
  const SearchIpt: React.FC = () => (
    //查询组件
    <>
      <Search
        placeholder="请输入准确的姓名"
        enterButton="查询"
        size="large"
        onSearch={search}
        //   loading
      />
    </>
  );
  const search = (values: any) => {
    //查询请求
    if (values) {
      //判空
      axios
        .post("/api/students/search", {
          //向后端发送查询的名字
          searchname: values,
        })
        .then((res) => {
          if (res.data.code === 0) {
            //如果列表里有，那么就把处理过的一个新的数组，setstate
            const STUDENT: DataType = res.data.student;
            console.log(STUDENT);
            let a: DataType[] = [];
            // STUDENTS=[];
            a.push(STUDENT); //把返回的对象塞进去
            // // console.log(STUDENTS)
            setStudentList(a);
          } else {
            message.error("查无此人！");
          }
        });
    } else {
      message.error("输入不能为空！");
    }
  };

  const DeleteIpt: React.FC = () => (
    //查询组件
    <>
      <Search
        placeholder="输入删除用户的准确姓名"
        enterButton="删除"
        size="large"
        onSearch={deleterequest}
        //   loading
      />
    </>
  );
  const deleterequest = (values: any) => {
    //发送删除请求
    if (values) {
      axios
        .post("/api/students/delete", {
          //通过查询组件进行删除
          name: values,
        })
        .then((res) => {
          console.log(res.data.students);
          if (res.data.code === 0) {
            //把删除后的数组set
            setStudentList(res.data.students);
            message.success("删除成功！");
          } else {
            message.error("该用户不存在！");
          }
        });
    } else {
      message.error("输入不能为空！");
    }
  };
  const reset = () => {
    //重置按钮的请求
    axios.get("/api/students/reset").then((res) => {
      //查询之后把列表重置一下
      STUDENTS = res.data.students;
      setStudentList(STUDENTS);
      message.success("重置成功");
    });
  };
  var add = (arr: DataType[]) => {
    //从Modal子组件传值
    setStudentList(arr);
  };
  return (
    <>
      <div className="header">
        <Space>
          <SearchIpt></SearchIpt>
          <DeleteIpt></DeleteIpt>
          <Button size="large" onClick={reset}>
            重置
          </Button>
          <MyModal add={add}></MyModal>
        </Space>
      </div>
      <Table
        columns={columns}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dataSource={studentlist}
      />
    </>
  );
};

export default MyTable;
