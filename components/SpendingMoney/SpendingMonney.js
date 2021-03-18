import React, { useState, useEffect } from 'react';
import { Button, Spin, Space } from 'antd';

import styles from "./type.module.css";
import CheckBoxInput from './CheckBoxInput';
import { callApiGetPagination, addAPIPagination, updateAPI, deleteAPI } from './fetchAPI';
function SpendingMonney() {
    const [listData, setListData] = useState([])
    const [checkShowInput, setCheckShowInput] = useState(true)
    const [checkLoad, setCheckLoad] = useState(false)
    const [pushMore, setPushMore] = useState([
        {
            nameRequest: "",
            money: 0,
            disable: false,
            used: true
        }
    ])
    const [newObject, setNewObject] = useState({})
    useEffect(() => {
        get();
        setCheckLoad(true);
    }, []);
    const get = (e) => {
        callApiGetPagination(e)
            .then(res => {
                setListData(res.items);
                setCheckLoad(false);
            })
            .catch((error) => {
                reject(error);
                setCheckLoad(false);
            })

    }



    const pushOject = () => {
        setCheckLoad(true);
        addAPIPagination(...pushMore)
            .then(res => {
                // setListData([...listData, ...pushMore])
                // console.log(res, "succeesss");
                setCheckLoad(false);
                get();
            })
            .catch((error) => {
                reject(error);
                setCheckLoad(false);
            })

    }
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e)

    };
    const handle = e => {
        setDatas(e.target.value)
    }

    const saveAll = async () => {
        await listData.map((item) => {
            setCheckLoad(true);
            updateAPI(item)
                .then(res => {
                    setCheckLoad(false);
                })
                .catch((error) => {
                    reject(error);
                    setCheckLoad(false);
                })

        })
        // await get()
    }
    const handleDelete = (id) => {
        setCheckLoad(true);
        deleteAPI(id)
            .then(res => {
                get();
                setCheckLoad(false);
            })
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
                        handleDelete={handleDelete}
                        checkShowInput={checkShowInput}
                        setCheckShowInput={setCheckShowInput}
                        style={{ width: 200, marginLeft: 20 }} />
                )
            }


            )}

            <Button onClick={saveAll} type="dashed" size="large">Save</Button>
            <Button onClick={pushOject} type="dashed" size="large">Push</Button>
            {checkLoad ?
                <div style={{ position: 'absolute', top: '40%', left: "50%" }}>
                    <Space size="middle">
                        <Spin tip='Đang cập nhập' size="large" />
                    </Space>
                </div> : null
            }
        </div >



    )
}


export default SpendingMonney;
