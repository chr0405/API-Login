import React, {useState} from 'react'
 import axios from 'axios';

export default function Login() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const onChangeId = (id) => {
      setId(id.target.value);
  }

  const onChangePassword = (password) => {
    setPassword(password.target.value);
}


  const onSumbitInfo = async(form) =>{
    // axios를 통신하는 동안 버튼이 클릭 되지 않도록
    form.preventDefault();
    setMsg('Loading...');

    if(id === '' | password === ''){
      alert('전부 입력해주세요');
      return;
    }

    axios({
      method: 'post',
      url: 'http://localhost:8000/user/login',
      data: {
        id: id,
        pw: password
      }
    })
    .then(function (response) {
      console.log(response.data.result);
      localStorage.setItem('token', response.data.result.AccessToken);
      localStorage.setItem('id', response.data.result.userId);
      setTimeout(() => setMsg(''), 1500);
    })
    .catch(function (error){
      console.log(error);
    })
}

  return (
    <div>
        <div>
            {/* onSubmit은 제출 시 실행되는 event */}
            <form onSubmit={onSumbitInfo}> 
                <label>ID</label>
                <input value={id} onChange={onChangeId}/>

                <label>Password</label>
                <input type='password' value={password} onChange={onChangePassword}/>

                <input type='submit'/>
            </form>
            <p>{msg}</p>
        </div>
    </div>
  )
}
