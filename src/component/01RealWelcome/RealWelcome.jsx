import React, {useState} from 'react';

import axios from 'axios';

import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form';
import Input from "@material-ui/core/Input";

import './RealWelcome.scss';

const RealWelcome = () => {
  const { register, handleSubmit, errors } = useForm();
  const [ isSubmitted, setSubmitted ] = useState(false);
  const onSubmit = async(phone) => {
    await console.log(phone);
    const url = `${process.env.REACT_APP_DOMAIN}/api/subscribe`;
    const req = await axios.post(url, phone);
    console.log("success", req);
    
  }

  return (
    <div className="image">
      <div className="tiledBackground" />
      <div className="blankspace" style={{ 'margin-left': '50px' }}>
        <span className="season3" style={{ 'font-weight': 'bold' }}>
          홍개팅 시즌4
        </span>
        에서 만나요!
      </div>
      <br />
      <br />

      <div className="subtitle" style={{ 'margin-left': '50px' }}>
        홍대 학우분들의 많은 관심 속에서 <br />
        <span className="bold">시즌3</span>이 종료되었음을 알려드려요. <br />
        <br /> <span className="bold">새로운 홍대 학우와의 만남</span>을 통해{' '}
        <br />
        우리의 대학 생활이 더욱 행복하게 <br />
        되길 바라는 마음입니다.
        <br />
        <br />
        더 나은 모습으로 준비하여 <br />
        <span className="bold">홍개팅 시즌4</span>로 돌아올게요.
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          style={{ marginBottom: "20px" }}
          name="phone"
          inputRef={({
            validate: value => value.length === 11
          })}
          placeholder="01012345678"
        />
        <div>
          <input 
            type="submit"
            onClick={() => {
              if(errors.phone){
                alert("'-'는 제외한 모든 숫자를 입력해주세요")
              }
            }}
          />
        </div>
      </form>

      <Container
        className="signUpLink"
        maxWidth="sm"
        style={{ 'text-align': 'center', 'margin-top': '100px' }}
      >
        <a
          style={{
            'font-family': 'Noto Sans KR, sans-serif',
            'text-decoration': 'underline',
            'text-underline-position': 'under',
            'font-size': '11px',
            color: '#f06595',
          }}
          href="https://www.notion.so/campuscc/5cc4e045648d4507b645c2360d890fd5"
        >
          {`홍개팅에 대해 알고 싶다면?`}
        </a>
      </Container>
    </div>
  );
};

export default RealWelcome;
