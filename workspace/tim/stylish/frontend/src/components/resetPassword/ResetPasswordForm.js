import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

const elasticIp = process.env.REACT_APP_ELASTIC_IP;

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "密碼不相符",
    path: ["confirmPassword"],
  });

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

const ResetPasswordForm = ({ resetToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const handleResetPassword = async (values) => {
    try {
      // Send a request to your API to reset the password
      const res = await axios.post(`https://${elasticIp}/api/1.0/user/reset-password`, {
        resetToken: resetToken,
        newPassword: values.password,
      });

      if (res.status !== 200) {
        throw new Error("Failed to reset password");
      }
      // Inform the user that the password has been reset
      Swal.fire(
        "Password Reset",
        "Your password has been successfully reset.",
        "success"
      ).then(() => {
        window.location.href = "/login";
      }
      );

      // You may want to redirect the user to a different page or display a confirmation message
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      Swal.fire(
        "Error",
        "Failed to reset password. Please try again.",
        "error"
      );
    }
  };

  return (
    <FormContainer>
      <Title>重設密碼</Title>
      <StyledForm method="post" onSubmit={handleSubmit(handleResetPassword)}>
        <Label htmlFor="password">
          <LabelText>新密碼</LabelText>
          <Input type="password" required {...register("password")} />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </Label>
        <Label htmlFor="confirmPassword">
          <LabelText>確認新密碼</LabelText>
          <Input type="password" required {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}
        </Label>
        <Button type="submit">重設密碼</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default ResetPasswordForm;
