import { Button, Form, InputNumber, message, Select } from 'antd';
import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { useRouter } from 'next/router';
const { Option } = Select;
const success = () => {
  message.success('done !');
}
const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('rmb');
  const triggerChange = (changedValue) => {
    console.log(value)
    onChange?.({
      number,
      currency,
      ...value,
      ...changedValue,
    });
  };

  const onNumberChange = (value) => {
    const newNumber = value;
    triggerChange({
      number: newNumber,
    });
  };

  const onCurrencyChange = (newCurrency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({
      currency: newCurrency,
    });
  };

  return (
    <span>
      {/* <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      /> */}
      <InputNumber
        value={value.number}
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        onChange={onNumberChange}
      />
      <Select
        value={value.currency || currency}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        onChange={onCurrencyChange}
      >
        <Option value="Dong">Dong</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};

const Tutol = ({ t, data }) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const nameSession = session?.user.name;
  const [dataCurrent, setDataCurrent] = useState(undefined);
  const [form] = Form.useForm();
  const [isRefresh,setIsRefresh] = useState(false);
  const [isloading,setIsLoading] = useState(false);
  const dataTest = {
    number: 0,
    currency: 'Dong'
  }
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefresh(!isRefresh)
  }

  useEffect(() => {
    let id1;
    data.map(item => {
      if (item.name === nameSession) {
        return id1 = item.id
      }
    });
    const result = data.find(({ id }) => id === id1);
    setDataCurrent(result);
    setIsRefresh(!isRefresh)
  }, [data, session])
  useEffect(() => {
    form.setFieldsValue(
     ( dataCurrent !== undefined) ? ({ price: dataCurrent }) : '');
  },[isRefresh]);
  const onFinish = (values) => {
    // form.setFieldsValue(
    //   { price })
     fetch(`https://6050183ac20143001744e15e.mockapi.io/money/${dataCurrent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values.price),
    }
    ).then(response => response.json())
      .then(user => {
        success();
        refreshData();
        setIsLoading(false)
      })
      .catch((error) => {
      });
    // if (res.status < 300) {
    //       refreshData();
    //     }
  };

  const checkPrice = (_, value) => {
    if (value.number !== 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };
  return (
    <Form
      form={form}
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'Dong',
        },
      }}
    >
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            validator: checkPrice,
          },
        ]}
      >
        <PriceInput />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default withNamespaces()(Tutol)