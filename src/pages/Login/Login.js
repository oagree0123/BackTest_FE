import React, { useState } from "react";
import {
  LoginCont,
  LoginLeft,
  LoginRight,
  LoginInput,
  LoginWrap,
  InputLabel,
  InputWrap,
  LoginBtnWrap,
  LoginBtn,
  KakaoLoginBtn,
  LeftTitle,
  LOGO,
  Line,
  ErrorText,
} from "./style";
import { useDispatch } from "react-redux";
import { history } from '../../redux/configStore';

import { actionCreators as userActions } from "../../redux/modules/user";

const Login = () => {
  const API_key = "4f269c2d7b614ed22a514496123b7a38";
  const Redirect_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_key}&redirect_uri=${Redirect_URI}&response_type=code`;

  const dispatch = useDispatch();

  // 이메일, 비밀번호
  const [user_name, setUserName] = useState("");
  const [pwd, setPwd] = useState("");

  // 입력 오류 확인
  const [is_email, setIsEmail] = useState(false);
  const [is_pwd, setIsPwd] = useState(false);

  // 로그인
  const clickLogin = () => {
    if (user_name === "" || pwd === "") {
      window.alert("빈칸을 모두 입력해주세요.");
      return;
    }

    const login_data = {
      user_name,
      pwd,
    };

    dispatch(userActions.LoginDB(login_data));
  };

  // 카카오 로그인
  const clickKakao = () => {
    return (window.location.href = KAKAO_AUTH_URL);
  };

  const onChangeEmail = (e) => {
    const email_reg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const current_email = e.target.value;

    setUserName(current_email);

    if (!email_reg.test(current_email)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  }

  const onChangePwd = (e) => {
    const pwd_reg =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const current_pwd = e.target.value;
    setPwd(current_pwd);

    if (!pwd_reg.test(current_pwd)) {
      setIsPwd(false);
    } else {
      setIsPwd(true);
    }
  }

  return (
    <LoginWrap>
      <LoginCont>
        <LoginLeft>
          <LeftTitle>
            Back&Stock에 <br />
            오신 것을 환영합니다.
          </LeftTitle>
        </LoginLeft>

        <LoginRight>
          <LOGO onClick={()=>{
            history.push('/')
          }}></LOGO>
          <KakaoLoginBtn onClick={clickKakao}>카카오로 계속하기</KakaoLoginBtn>
          <Line />
          <InputWrap>
            <InputLabel>이메일</InputLabel>
            <LoginInput
              type="text"
              onChange={onChangeEmail}
            />
            {user_name.length > 0 && !is_email && (
              <ErrorText>올바른 이메일 형식을 입력해주세요.</ErrorText>
            )}
          </InputWrap>
          <InputWrap>
            <InputLabel>비밀번호</InputLabel>
            <LoginInput
              type="password"
              onChange={onChangePwd}
            />
            {pwd.length > 0 && !is_pwd && (
              <ErrorText>8~20자로 영문 대소문자, 숫자, 특수문자 조합을 사용하세요.</ErrorText>
            )}
          </InputWrap>
          <LoginBtnWrap>
            <LoginBtn onClick={clickLogin}>로그인</LoginBtn>
          </LoginBtnWrap>
        </LoginRight>
      </LoginCont>
    </LoginWrap>
  );
};

export default Login;
