import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import styled from "styled-components";

const elasticIp = process.env.REACT_APP_ELASTIC_IP || "localhost";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
`;

const Title = styled.p`
  margin-bottom: 2.5rem;
  font-size: 1.5rem;
  color: black;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1.5rem;
`;

const LabelText = styled.p`
  margin-bottom: 0.625rem;
  font-size: 1rem;
  font-weight: medium;
  color: black;
`;

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 0.375rem;
  padding: 0.5rem 0.875rem;
  min-width: 19.25rem;
  font-size: 1rem;
  font-weight: medium;

  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.span`
  color: #f87171; /* Tailwind red-500 */
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 0.375rem;
  padding: 0.625rem 3rem;
  margin-top: 1.25rem;
  font-size: 1rem;
  font-weight: normal;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.5;
  }
`;

// const GoogleLoginButton = styled.button`
//   margin: 0.75rem 0;
//   background: none;
//   border: none;
//   cursor: pointer;
// `;

// const GoogleLoginImage = styled.img`
//   width: auto;
//   height: auto;
// `;

const SignUpPrompt = styled.p`
  font-size: 1rem;
  font-weight: medium;
`;

const SignUpLink = styled.button`
  color: #92400e;
  background: none;
  border: none;
  cursor: pointer;
`;

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});
const LoginForm = ({ setShowLogin, showLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const setCookies = (data) => {
    const maxAge = { expires: 1 / 24 }; // 1hr
    Cookies.set("token", data.access_token, maxAge);
    Cookies.set("user_id", data.user.id.toString(), maxAge);
    Cookies.set("user_name", data.user.name, maxAge);
    Cookies.set("user_email", data.user.email, maxAge);
    Cookies.set("user_picture", data.user.picture, maxAge);
  };
  const handleError = (error) => {
    if (error?.response?.status === 404) {
      Swal.fire("查無此用戶", "請更換email", "error");
    }
    if (error?.response?.status >= 500 && error?.response?.status < 600) {
      Swal.fire("Server Error", "請稍後再試或和我們的技術團隊聯絡", "error");
    } else {
      Swal.fire("登入失敗", `${error}`, "error");
    }
  };
  const loginHandler = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://${elasticIp}/api/1.0/user/signin`,
        {
          provider: "native",
          email: values.email,
          password: values.password,
        }
      );
      console.log(response.data);
      const { access_token, user } = response.data.data;
      setCookies({ access_token, user });
      navigate(-1);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };
  //登入成功後
  const showLoginHandler = () => {
    setShowLogin(!showLogin);
  };

  return (
    <FormContainer>
      <Title>會員登入</Title>
      <StyledForm method="post" onSubmit={handleSubmit(loginHandler)}>
        {/* Email */}
        <Label htmlFor="email">
          <LabelText>電子郵件</LabelText>
          <Input
            type="email"
            required
            placeholder="例: test@test.com"
            {...register("email")}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Label>

        {/* Password */}
        <Label htmlFor="password">
          <LabelText>密碼</LabelText>
          <Input type="password" required {...register("password")} />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </Label>

        {/* Login Button */}
        <Button type="submit" disabled={loading}>
          登入
        </Button>

        {/* Google Login
            <GoogleLoginButton onClick={() => login()} disabled={loading}>
              <GoogleLoginImage src={GoogleLoginButton} alt="google-login" />
            </GoogleLoginButton> */}

        {/* Signup Prompt */}
        <SignUpPrompt>
          尚未成為會員 ?
          <SignUpLink onClick={showLoginHandler}>會員註冊</SignUpLink>
        </SignUpPrompt>
      </StyledForm>
    </FormContainer>
  );
};
export default LoginForm;
