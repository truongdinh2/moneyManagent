import { Button, Form, Input, InputNumber, message, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
interface Props {
  dataEdit: {
    id: number
  }
  checkEdit: boolean,
  onChangeOpen: any,
  employees1: any
}
interface Values {
  user: { email: string },
  email: string,
}
interface DataEdit {
  id: number

}
interface Data {
  email: string,
  id: number
}
const { Option }: any = Select;
const Diaolog: React.FC<Props> = (props: Props) => {
  const dataEdit = props.dataEdit;
  const [form] = Form.useForm();
  const checkEdit = props.checkEdit;
  const link = process.env.FLOOR;
  const employees1 = props.employees1;
  const [dataSelect, setDataSelect] = useState([]);
  // useEffect(() => {
  //   let dataS: string[] = [];
  //   employees1.map((dataObj: any) => {
  //     dataS.push(dataObj.name);
  //   })
  //   setDataSelect(dataS);

  // }, [])

  // useEffect(() => {
  //   form.setFieldsValue(
  //     checkEdit === true ? { user: dataEdit } : '');

  // });
  
  const onFinish = async (values: Values) => {
  //   if (!dataEdit) {
  //     fetch(link, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values.user),
  //     }).then(() => {
  //       success()
  //       props.onChangeOpen()
  //     });
  //   } else {
  //     fetch(`${link}/${dataEdit.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(values.user),
  //     }
  //     ).then(() => {
  //       props.onChangeOpen()
  //       success();
  //     })
  //   }
  // };

  // const success = () => {
  //   message.success('done !');
  console.log(values)
  };

  return (
    <div className="diolog">

      <Form name="nest-messages" onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
        >
        <Form.Item name={['user', 'Floor']} label="Floor" rules={[{ required: true }]}>
          <Input

          />
        </Form.Item>
        <Form.Item
          name={['user', 'Time_from']}
          label="Số bàn trống"
          rules={[{ required: true },{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['user', 'time_to']}
          label="DM"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'member']} label="member"
          rules={[{ required: true }]}>
          <Select
            mode="multiple"
            placeholder="choose name"
          >
         
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn"
          // onClick={()=>{setUserEdits(null)}}
          >
            Submit
        </Button> 
        </Form.Item>
      </Form>
    </div>


  );
};
export default Diaolog;
