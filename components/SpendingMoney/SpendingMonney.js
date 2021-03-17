import React, { useState } from 'react';
import { Table, Button } from 'antd';


import CheckBoxInput from './CheckBoxInput';
function SpendingMonney() {

    const [checkShowInput, setCheckShowInput] = useState(true)



    const [listData, setListData] = useState([
        {

            nameRequest: "31215536",
            money: "6145643",
            disable: true

        },
        {

            nameRequest: "31215536",
            money: "56135145",
            disable: true
        }
    ])
    const [pushMore, setPushMore] = useState([
        {

            nameRequest: "",
            money: "",
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
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}>
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
