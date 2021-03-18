import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, InputNumber } from 'antd';

import styles from './type.module.css'
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 15,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
};
const CheckBoxInput = props => {

    const { dataSucer, handleStateOrder } = props
    const { nameRequest, money, disable, used } = dataSucer

    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const [nickName, setNickName] = useState('')
    const [checkShowInput, setCheckShowInput] = useState(used)

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick]);


    const onCheckboxChange = (e) => {
        setCheckNick(e.target.checked);
        setCheckShowInput(!checkShowInput)
        handleStateOrder({ used: e.target.checked })
    };
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
        } catch (errorInfo) {
        }
    };
    const handleChangeType = (e) => {
        handleStateOrder({ nameRequest: e.target.value })
    }
    const handleTest = e => {
        console.log(e, "%%%%%");
        // this.props.onChanges(e)
        const isInteger = /^[0-9]+$/;
        if (e === '' || isInteger.test(e)) {
            handleChangeMoney(e)
        }
    }
    const handleChangeMoney = (e) => {
        handleStateOrder({ money: e })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Form
                initialValues={{ bi: money }}
                validateMessages={validateMessages}
                form={form} name="dynamic_rule" style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Item style={{ marginRight: 30 }}>
                    <Checkbox checked={checkShowInput} defaultChecked={used} onChange={onCheckboxChange}>

                    </Checkbox>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    rules={[
                        {
                            required: used,
                            message: 'Please input your nickname',
                        },
                    ]}

                >
                    <Input className={styles.antInput} disabled={disable} value={nameRequest} onChange={handleChangeType} placeholder="nn" />
                </Form.Item>
                {(checkShowInput) ?
                    <Form.Item
                        name="bi"
                        label="Số bàn trống"
                        rules={[{ required: true }, { type: 'number', min: 0, max: 100000 }]}>

                        <InputNumber
                            // defaultValue={this.props.datas}
                            onChange={handleTest}
                            style={{ width: 300, marginLeft: 15, height: '50%' }}
                            formatter={value =>
                                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            parser={value =>
                                value.replace(/\$\s?|(,*)/g, '')

                            }


                        />
                    </Form.Item>
                    : null
                }
            </Form>

        </div>
    );
};

export default CheckBoxInput