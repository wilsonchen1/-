import { PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import axios from "axios";
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
interface IProps {
  //定义的接口，为了和父组件(实际上是爷爷组件)传递数据
  Edit: (arr: any) => void;
  prop: DataType;
}

const waitTime = (time: number = 100) => {
  //做一个时间延迟，提交减轻用户压力
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Edit: React.FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm<{
    id:number;
    name: string;
    sex: string;
    major: string;
    grade: string;
    email: string;
    phonenumber: string;
    headimg: string;
  }>();
  const { Edit } = props; //解构拿到option.tsx的Edit函数
  return (
    <ModalForm<{
      id: number;
      name: string;
      sex: string;
      major: string;
      grade: string;
      email: string;
      phonenumber: string;
      headimg: string;
    }>
      title="编辑用户"
      trigger={<a>编辑</a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("run"),
      }}
      submitTimeout={1500}
      onFinish={async (values) => {
        //这里是编辑人员的主函数，提交后触发
        await waitTime(1500);
        console.log(values);
        axios
          .post("/api/students/edit", {
            //把输入的数据发送请求给后端
            id: props.prop.id,
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
            Edit(res.data.students); //把新返回的数组传回table，并在table进行state更新
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
          initialValue={props.prop.name}
          rules={[{ required: true }]}
        />

        <ProFormText
          width="md"
          name="major"
          label="专业"
          placeholder="专业"
          initialValue={props.prop.major}
          rules={[{ required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="grade"
          label="年级"
          placeholder="如2021级"
          initialValue={props.prop.grade}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="sex"
          label="性别"
          initialValue={props.prop.sex}
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
          initialValue={props.prop.phonenumber}
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
          initialValue={props.prop.email}
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
          initialValue={props.prop.headimg}
          placeholder="如没有头像地址，则系统生成默认头像"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
export default Edit;
