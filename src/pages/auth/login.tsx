import { useState } from "react";
import type { UserFormValueType } from "../../types";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import { login, signup } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const handleLogin = async (formValue: UserFormValueType) => {
    try {
      // Perform login logic here, e.g., API call
      const res = await login(formValue);
      if (res.success) {
        toast.success("Login successful!");
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/app");
      } else {
         toast.error("Login failed: " + res.message);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Login failed");
    }
  };


  const handleSignup = async (formValue: UserFormValueType) => {
    try {
      // Perform signup logic here, e.g., API call
      const res=await signup(formValue);
      if (res.success) {
        toast.success("Signup successful! Please log in.");
        setShowLogin(true);
      } else {
         toast.error("Signup failed: " + res.message);
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("An error occurred during signup.");
    }
  };


    return showLogin ? (
      <Login onLogin={handleLogin} switchToSignup={() => setShowLogin(false)} />
    ) : (
      <Signup onSignup={handleSignup} switchToLogin={() => setShowLogin(true)} />
    );
}
