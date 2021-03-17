import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import ChangeTypeMoney from './ChangeTypeMoney';
import styles from './type.module.css'
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
                <Form.Item style={{ marginRight: 30 }}>
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
                //  shouldUpdate={(pre, cur) => pre.nickname !== cur.nickname }
                >
                    <Input className={styles.antInput} disabled={disable} value={nameRequest} onChange={handleChangeType} placeholder="nn" />
                </Form.Item>
            </Form>
            {(!checkShowInput) ? <ChangeTypeMoney style={{ width: 300, marginLeft: 15, height: '50%' }} defaultValue={money} onChanges={handleChangeMoney} /> : null}
        </div>
    );
};

export default CheckBoxInput