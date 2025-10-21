import React, { useState } from "react";
import type { UserFormValueType } from "../types";
import { validateUserForm } from "../utility";

interface LoginProps {
  loading?: boolean;
  onLogin: (formValue: UserFormValueType) => void;
  switchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, switchToSignup, loading }) => {
  const [formValue, setFormValue] = useState<UserFormValueType>({
    username: "",
    password: ""
  });
  const [error, setError] = useState<{ usernameError: string; passwordError: string }>({
    usernameError: "",
    passwordError: ""
  });
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValue.username.trim() && formValue.password.trim()) {
      const validation = validateUserForm(formValue.username, formValue.password);
      if (!validation.valid) {
        setError({ usernameError: validation.errors.username || "", passwordError: validation.errors.password || "" });
        return;
      }
      onLogin(formValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-80">
        <input
          type="text"
          placeholder="Enter your username"
          value={formValue.username}
          onChange={(e) => setFormValue({ ...formValue, username: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
        />
        {/* For showing error messages */}
        {error.usernameError && <p className="text-red-500 text-sm">{error.usernameError}</p>}
        <input
          type="password"
          placeholder="Enter your password"
          value={formValue.password}
          onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
        />
        {error.passwordError && <p className="text-red-500 text-sm">{error.passwordError}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:!cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        Don’t have an account?{" "}
        <button
          onClick={switchToSignup}
          className="text-green-600 font-semibold hover:underline"
        >
          Signup
        </button>
      </p>
    </div>
  );
};

export default Login;
