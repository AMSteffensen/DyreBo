import { useState } from "react";
import { Card, Input, Button } from "@supabase/auth-ui-react";
import supabase from "../lib/supabase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <Card>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Card>
  );
};

export default LoginForm;
