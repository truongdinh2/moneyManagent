import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import ChangeTypeMoney from './ChangeTypeMoney'
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 15,
    },
};


const CheckBoxInput = props => {

    const { dataSucer, handleStateOrder } = props
    const { nameRequest, money, disable } = dataSucer
    console.log(props, nameRequest, "0*****************");
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const [nickName, setNickName] = useState('')
    const [checkShowInput, setCheckShowInput] = useState(true)

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick]);
    // const onChange = () => {
    //     setValue(!checkShowInput)

    // };

    const onCheckboxChange = (e) => {
        setCheckNick(e.target.checked);
        setCheckShowInput(!checkShowInput)

    };

    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };
    console.log(nickName);
    const handleChangeType = (e) => {
        handleStateOrder({ nameRequest: e.target.value })
    }
    const handleChangeMoney = (e) => {
        handleStateOrder({ money: e })
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Form form={form} name="dynamic_rule" style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Item>
                    <Checkbox checked={checkNick} onChange={onCheckboxChange}>

                    </Checkbox>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}


                    rules={[
                        {
                            required: checkNick,
                            message: 'Please input your nickname',
                        },
                    ]}
                // shouldUpdate={(pre, cur) => pre.nickname !== cur.nickname }
                >
                    <Input disabled={disable} value={nameRequest} onChange={handleChangeType} />
                </Form.Item>
            </Form>
            {(!checkShowInput) ? <ChangeTypeMoney style={{ width: 200, marginLeft: 15 }} value={money} onChanges={handleChangeMoney} /> : null}
        </div>
    );
};

export default CheckBoxInput