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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (formValue: UserFormValueType) => {
    try {
      setLoading(true);
      // Perform login logic here, e.g., API call
      const res = await login(formValue);
      if (res.success) {
        toast.success("Login successful!");
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        setLoading(false);
        navigate("/app");
      } else {
        toast.error("Login failed: " + res.message);
        setLoading(false);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Login failed");
    }finally {
      setLoading(false);
    }
  };


  const handleSignup = async (formValue: UserFormValueType) => {
    try {
      // Perform signup logic here, e.g., API call
      setLoading(true);
      const res=await signup(formValue);
      if (res.success) {
        toast.success("Signup successful! Please log in.");
        setShowLogin(true);
        setLoading(false);
      } else {
        toast.error("Signup failed: " + res.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };


    return showLogin ? (
      <Login onLogin={handleLogin} switchToSignup={() => setShowLogin(false)} loading={loading} />
    ) : (
      <Signup onSignup={handleSignup} switchToLogin={() => setShowLogin(true)} loading={loading} />
    );
}
