import React, { useState } from 'react';
import { Table, Button } from 'antd';

import styles from "./type.module.css";
import CheckBoxInput from './CheckBoxInput';
function SpendingMonney() {

    const [checkShowInput, setCheckShowInput] = useState(true)



    const [listData, setListData] = useState([
        {

            nameRequest: "Đổ xăng",
            money:12000,
            disable: true

        },
        {

            nameRequest: "Ăn trưa",
            money: 5000,
            disable: true
        }
    ])
    const [pushMore, setPushMore] = useState([
        {

            nameRequest: "",
            money: 0,
            disable: false
        }
    ])
    const pushOject = () => {
        setListData([...listData, ...pushMore])
    }
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e)

    };
    const handle = e => {
        setDatas(e.target.value)
    }
  
    console.log(listData, "------------------------AAAAAAAAAAA");
    return (
        <div className={styles.container}
        // style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}
        >
            {listData.map((item, key) => {
                let items = { ...item, id: key }
                return (
                    <CheckBoxInput
                        dataSucer={items}
                        key={key}
                        handleStateOrder={(dates) => {
                            let newArr = [...listData]
                            newArr[key] = { ...item, ...dates }
                            setListData(newArr)

                        }}

                        checkShowInput={checkShowInput}
                        setCheckShowInput={setCheckShowInput}
                        style={{ width: 200, marginLeft: 20 }} />
                )
            }


            )}


            <Button onClick={pushOject} type="dashed" size="large">Push</Button>
        </div>



    )
}


export default SpendingMonney;
