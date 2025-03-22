import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { hashPassword, setLoginTimestamp } from "../services/auth";
import { loginUser, registerUser } from "../services/api";
import { LoginProps } from "../utils/types";


const Login: React.FC<LoginProps> = ({ visible, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    if (!username || !password) {
      message.warning("Please fill in all fields");
      return;
    }

    const hashedPassword = hashPassword(password);

    try {
      if (isRegistering) {
        if (!userAlias) {
          message.warning("Please enter a display name");
          return;
        }
        await registerUser(username, hashedPassword, userAlias);
        message.success("Registration successful!");
      } else {
        await loginUser(username, hashedPassword);
        message.success("Login successful!");
      }
      setLoginTimestamp();
      onLoginSuccess();
      onClose();
    } catch (error) {
      message.error("Authentication failed");
    }
  };

  return (
    <Modal title={isRegistering ? "Register" : "Login"} open={visible} onCancel={onClose} footer={null}>
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: 10 }} />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: 10 }} />
      {isRegistering && (
        <Input placeholder="Display Name" value={userAlias} onChange={(e) => setUserAlias(e.target.value)} style={{ marginBottom: 10 }} />
      )}
      <Button type="primary" onClick={handleAuth} block>
        {isRegistering ? "Register" : "Login"}
      </Button>
      <Button type="link" onClick={() => setIsRegistering(!isRegistering)} block>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </Button>
    </Modal>
  );
};

export default Login;
