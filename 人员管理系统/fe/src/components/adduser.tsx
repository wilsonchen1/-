import { PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import axios from "axios";
interface IProps {
  //定义的接口，为了和父组件传递数据
  add: (arr: any) => void;
}

const waitTime = (time: number = 100) => {
  //做一个时间延迟，提交减轻用户压力
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const MyModal: React.FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm<{
    name: string;
    sex: string;
    major: string;
    grade: string;
    email: string;
    phonenumber: string;
    headimg: string;
  }>();
  const { add } = props; //解构拿到table组件的add函数
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
      submitTimeout={1500}
      onFinish={async (values) => {
        //这里是添加人员的主函数，提交后触发
        await waitTime(1500);
        console.log(values);
        axios
          .post("/api/students/add", {
            //把输入的数据发送请求给后端
            name: values.name,
            sex: values.sex,
            major: values.major,
            grade: values.grade,
            email: values.email,
            phonenumber: values.phonenumber,
            headimg: values.headimg,
          })
          .then((res) => {
            console.log(res.data);
            add(res.data.students); //把新返回的数组传回table，并在table进行state更新
          });
        message.success("提交成功");
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="学生姓名"
          placeholder="请输入真实姓名"
          rules={[{ required: true }]}
        />

        <ProFormText
          width="md"
          name="major"
          label="专业"
          placeholder="专业"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="grade"
          label="年级"
          placeholder="如2021级"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="sex"
          label="性别"
          rules={[
            { required: true },
            { pattern: /^[男|女|跨性别]{1}$/, message: "男或女或跨性别" },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="phonenumber"
          label="电话"
          rules={[
            { required: true },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: "请输入正确的手机号码格式！",
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          rules={[
            { required: true },
            {
              pattern:
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: "请输入正确邮箱",
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="headimg"
          label="头像"
          placeholder="如没有头像地址，则系统生成默认头像"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
export default MyModal;
