import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-hooks";
import ProfileForm from "../../components/ProfileForm";
import ListingsTable from "../../components/ListingsTable";

export default function DashboardPage() {
  const router = useRouter();
  const { user, session, loading } = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <h2>Edit Profile</h2>
      <ProfileForm user={user} supabase={supabase} />
      <h2>Listings</h2>
      <ListingsTable user={user} supabase={supabase} />
    </div>
  );
}
