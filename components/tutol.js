import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { withNamespaces } from 'react-i18next';
import numeral from 'numeral';
import { session, useSession } from 'next-auth/client';
const { Option } = Select;

const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
    const [currency, setCurrency] = useState('rmb');
    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            currency,
            ...value,
            ...changedValue,
        });
    };

    const onNumberChange = (e) => {
        const newNumber = numeral(e.target.value || '0', 10).format("0,0");
        if (Number.isNaN(number)) {
            return;
        }
        // (value)
        // (newNumber, 'newnb')
        if (!('number' in value)) {
        
            setNumber(newNumber);
        }

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
            <Input
                type="text"
                value={value.number || number}
                onChange={onNumberChange}
                style={{
                    width: 100,
                }}
            />
            <Select
                value={value.currency || currency}
                style={{
                    width: 80,
                    margin: '0 8px',
                }}
                onChange={onCurrencyChange}
            >
                <Option value="dong">dong</Option>
                <Option value="dollar">Dollar</Option>
            </Select>
        </span>
    );
};

const Tutol = ({ t, data }) => {
    console.log( data,"@@@@@@@@@@@");
  const [session, loading] = useSession();
//   let datas=[]
    const nameSession = session?.user.name;
    const onFinish = (values) => {
        var id;
        data.map(item => {
            if(item.name === nameSession){
                return id = item.id
            }
        })
        console.log(id)
        fetch(`https://6050183ac20143001744e15e.mockapi.io/money/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values.price),
        }
        ).then(response => response.json())
        .then(user => {
          console.log('Success:', user);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        console.log(values.price)
    };

    const checkPrice = (_, value) => {
        if (value.number !== 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
    };

    return (
        <Form
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