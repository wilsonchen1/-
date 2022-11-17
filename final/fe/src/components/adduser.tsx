import { PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import axios from "axios";
interface IProps {//定义的接口，为了和父组件传递数据
  add: (arr: any) => void
}

const waitTime = (time: number = 100) => {//做一个时间延迟，提交减轻用户压力
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const MyModal: React.FC<IProps> = (props:IProps) => {
  const [form] = Form.useForm<{
    name: string;
    sex: string;
    major: string;
    grade: string;
    email: string;
    phonenumber: string;
    headimg: string;
  }>();
  const {add}=props;//解构拿到table组件的add函数
  return (
    <ModalForm<{
      name: string;
      sex: string;
      major: string;
      grade: string;
      email: string;
      phonenumber: string;
      headimg: string;
    }>
      title="添加用户"
      trigger={
        <Button type="primary" size="large">
          <PlusOutlined />
          添加用户
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("run"),
      }}
      submitTimeout={3000}
      onFinish={async (values) => {//这里是添加人员的主函数，提交后触发
        await waitTime(3000);
        console.log(values);
        if (values.sex !== "男" && values.sex !== "女") {
          message.error("输入无效数据");
          return false;
        } else {
          axios.post("/api/students/add", {//把输入的数据发送请求给后端
            name: values.name,
            sex: values.sex,
            major: values.major,
            grade: values.grade,
            email: values.email,
            phonenumber: values.phonenumber,
            headimg: values.headimg,
          }).then((res)=>{
            console.log(res.data)
            add(res.data.students)//把新返回的数组传回table，并在table进行state更新
          });
          message.success("提交成功");
          return true;
        }
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="学生姓名"
          placeholder="请输入真实姓名"
        />

        <ProFormText width="md" name="major" label="专业" placeholder="专业" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="grade"
          label="年级"
          placeholder="如2021级"
        />
        <ProFormText
          name="sex"
          label="性别"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="phonenumber" label="电话" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="email" label="邮箱" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="headimg"
          label="头像"
          placeholder="请输入您的头像地址"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
export default MyModal;
