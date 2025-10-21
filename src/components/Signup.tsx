import React, { useState } from "react";
import type { UserFormValueType } from "../types";
import { toast } from "react-toastify";
import { validateUserForm } from "../utility";

interface SignupProps {
  loading?: boolean;
  onSignup: (formValue: UserFormValueType) => void;
  switchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, switchToLogin, loading }) => {
   const [formValue, setFormValue] = useState<UserFormValueType>({
     username: "",
     password: "",
   });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValue.username.trim() && formValue.password.trim()) {
      const validation = validateUserForm(formValue.username, formValue.password);
      if (!validation.valid) {
        toast.error(validation.message);
        return;
      }
      onSignup(formValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-80">
        <input
          type="text"
          placeholder="Choose a username"
          value={formValue.username}
          onChange={(e) => setFormValue({ ...formValue, username: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Choose a Password"
          value={formValue.password}
          onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400"
        />
        <div className="w-full flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-gray-700">Show Password</label>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:!cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
