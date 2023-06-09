import { useState } from "react";

type ProfileFormProps = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  supabase: any; // Replace 'any' with the appropriate type for Supabase
};

export default function ProfileForm({ user, supabase }: ProfileFormProps) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSave = async () => {
    try {
      await supabase
        .from("users")
        .update({ name, email })
        .match({ id: user.id });
      alert("Profile saved successfully!");
    } catch (error: any) {
      console.error("Error saving profile:", error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
