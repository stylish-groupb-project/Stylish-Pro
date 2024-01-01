import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";
import styled from 'styled-components';

const elasticIp = process.env.REACT_APP_ELASTIC_IP;

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
  padding-bottom: 2.75rem;
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
  font-weight: medium;

  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.p`
  margin-top: 0.5rem;
  color: #f87171; /* Tailwind red-500 */
`;

const SubmitButton = styled.button`
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

const SwitchButton = styled.button`
  color: #92400e; /* Tailwind brown */
  margin-top: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
`;
const signupSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email"),
        password: z
            .string()
            .min(6, "密碼需大於6個字元")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "密碼須包含大小寫和數字"),
        confirmPassword: z.string(),
    })
    .refine((value) => value.password === value.confirmPassword, {
        message: "密碼不相符",
        path: ["confirmPassword"],
    });
// SignupForm Component
const SignupForm = ({ setShowLogin, showLogin }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(signupSchema) });

    const signupHandler = async(values)=> {
        setLoading(true);
        try {
            await axios.post(`${elasticIp}/api/1.0/user/signup`, {
                name: values.name,
                email: values.email,
                password: values.password,
            });
            Swal.fire("註冊成功", "歡迎使用Stylish", "success");
            setShowLogin(!showLogin);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error) {
            if (error?.response?.status === 409) {
                Swal.fire("信箱已使用", `${error}`, "error");
            }
            if (error?.response?.status >= 500 && error?.response?.status < 600) {
                Swal.fire("Server Error", "請稍後再試或和我們的技術團隊聯絡", "error");
            } else {
                Swal.fire("登入失敗", `${error}`, "error");
            }
        }
        setLoading(false);
    }
    const showLoginHandler = () => {
        setShowLogin(!showLogin);
    }
    return (
        <FormContainer>
          <Title>會員註冊</Title>
          <StyledForm onSubmit={handleSubmit(signupHandler)}>
            <Label htmlFor="name">
              <LabelText>使用者名稱</LabelText>
              <Input type="text" required placeholder="例: Jaren Chang" {...register("name")} />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            </Label>
    
            <Label htmlFor="email">
              <LabelText>電子郵件</LabelText>
              <Input type="email" required placeholder="例: test@test.com" {...register("email")} />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </Label>
    
            <Label htmlFor="password">
              <LabelText>密碼</LabelText>
              <Input type="password" required {...register("password")} />
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
            </Label>
    
            <Label htmlFor="confirmPassword">
              <LabelText>再次輸入密碼</LabelText>
              <Input type="password" required {...register("confirmPassword")} />
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
            </Label>
    
            <SubmitButton type="submit" disabled={loading}>
              註冊
            </SubmitButton>
    
            <SwitchButton onClick={showLoginHandler}>
              已經是會員了 ? 會員登入
            </SwitchButton>
          </StyledForm>
        </FormContainer>
      );
};


export default SignupForm;
