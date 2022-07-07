import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/atoms";
import { CodeInput } from "../../components/atoms/Input/CodeInput";
import { Input } from "../../components/atoms/Input/Input";
import VStack from "../../components/atoms/VStack/VStack";

const Login = () => {
  const [android, setAndroid] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    setAndroid(window.android);
    setToken(window.android.getAccessToken());
  }, []);
  return (
    <VStack
      style={{
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Input title="아이디" />
      <Input title="패스워드" type="password" />
      <div>{token}</div>
      <Button
        onClick={() => {
          window.location.href = "https://m.naver.com/";
        }}
        label="로그인"
      />
      <Button
        onClick={() => {
          window.android.openQrCode();
        }}
        label="QR코드"
      />
    </VStack>
  );
};

export default Login;
