import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';

import styles from "./type.module.css";
import CheckBoxInput from './CheckBoxInput';
import { callApiGetPagination, addAPIPagination, updateAPI } from './fetchAPI';
function SpendingMonney() {
    const [listData, setListData] = useState([])
    const [checkShowInput, setCheckShowInput] = useState(true)
    const [pushMore, setPushMore] = useState([
        {
            nameRequest: "",
            money: 0,
            disable: false,
            used: false
        }
    ])
    const   [newObject, setNewObject] = useState({})
    useEffect(() => {
        get()
    }, []);
    const get = (e) => {
        callApiGetPagination(e)
            .then(res => {
                setListData(res.items)
            })
    }



    const  pushOject  = () => {
        addAPIPagination(...pushMore)
            .then(res => {
                setListData([...listData, ...pushMore])
                console.log(res, "succeesss");
            })
            .catch((error) => {
                reject(error)
            })

    }
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e)

    };
    const handle = e => {
        setDatas(e.target.value)
    }

    const saveAll = async () => { await listData.map((item)  =>  { 
        console.log(item,"--------------");
        updateAPI(item)
         
    }) 
// await get()
}
    return (
        <div className={styles.container}
        // style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}
        >

            {listData.map((item, key) => {

                return (
                    <CheckBoxInput
                        dataSucer={item}
                        key={key}
                        handleStateOrder={(dates) => {
                            let newArr = [...listData]
                            newArr[key] = { ...item, ...dates }
                            setListData(newArr)
                            setNewObject({ ...item, ...dates })
                        }}

                        checkShowInput={checkShowInput}
                        setCheckShowInput={setCheckShowInput}
                        style={{ width: 200, marginLeft: 20 }} />
                )
            }


            )}

            <Button onClick={saveAll} type="dashed" size="large">Save</Button>
            <Button onClick={pushOject} type="dashed" size="large">Push</Button>
        </div>



    )
}


export default SpendingMonney;
