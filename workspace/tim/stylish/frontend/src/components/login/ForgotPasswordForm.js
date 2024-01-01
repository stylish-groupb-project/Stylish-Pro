import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

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

const ForgotPasswordForm = ({ setShowForgotPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const handleForgotPassword = async (values) => {
    try {
      // Send a request to your API to initiate the password reset
      const res = await axios.post(`${elasticIp}/api/1.0/user/forgot-password`, {
        email: values.email,
      });
      
      if (res.status !== 200) {
        throw new Error("Failed to send reset link");
      }

      if(res.status === 403) {
        throw new Error("Email not found or not native login");
      }
      // Inform the user that the reset link has been sent
      Swal.fire(
        "Reset Link Sent",
        "Please check your email for the reset link.",
        "success"
      ).then(() => {
        setShowForgotPassword(false);
      }
      );

      // You may want to redirect the user to a different page or display a confirmation message
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      Swal.fire(
        "Error",
        error.message,
        "error"
      );
    }
  };

  const onCancel = () => {
    setShowForgotPassword(false);
  }

  return (
    <FormContainer>
      {/* <form onSubmit={handleSubmit(handleForgotPassword)}>
        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span>Email is required</span>}

        <button type="submit">Send Reset Link</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form> */}
      <Title>忘記密碼</Title>
      <StyledForm method="post" onSubmit={handleSubmit(handleForgotPassword)}>
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
        <Button type="submit">發送驗證信</Button>
        <Button type="button" onClick={onCancel}>取消</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default ForgotPasswordForm;
