import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../components/layout'
import Tutol from '../components/tutol'
export default function Page(props) {
  const [session, loading] = useSession();
  const [data, setData] = useState(props.data);
  const userName = session?.user.name;
  useEffect(() => {
    if (session) { setUser({ name: session.user.name, number: '20', }) }
    else { return; }
  }, [session, userName])
  useEffect(() => {
    setData(props.data)
  }, [props])
  const len = data.length;
  const [user, setUser] = useState(data[len - 1].name);
  
  useEffect(() => {
    if (user.name) {
      if (session && data.every((item) => item.name !== user.name )) {
        fetch('https://6050183ac20143001744e15e.mockapi.io/money', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then(response => response.json())
          .then(user => {
            console.log('Success:', user);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        console.log('ko chay')
      }
    }
  }, [session?.user.name, user.name]);
  console.log(data,'data da update ?')
  return (
    <Layout>
      <h1>
        Quản lý tiền
      </h1>
      <Tutol data={data} />
      <div>
        {JSON.stringify(data, null, 3)}
      </div>
      <ul>
        <li><h3>
          Tổng số tiền có trong mỗi tháng
        </h3></li>
        <li><h3>
          danh sách chi tiêu
        </h3></li>
        <li><h3>
          Hàm tính tổng tiền
        </h3></li>
        <li><h3>
          dự định sử dụng tiền với mục đích gì
        </h3></li>
      </ul>
    </Layout>
  )
}
export const getServerSideProps = async () => {
  const res = await fetch('https://6050183ac20143001744e15e.mockapi.io/money');
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}