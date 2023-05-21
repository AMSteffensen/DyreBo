import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/places">
          <p className="text-white font-semibold text-lg">Places</p>
        </Link>
        {session ? (
          <div>
            <Link href="/account">
              <p className="text-white mr-4">{user.email}</p>
            </Link>
            <button onClick={() => supabase.auth.signOut()}>
              <p className="text-white">Sign Out</p>
            </button>
          </div>
        ) : (
          <button onClick={() => router.push("/")}>
            <p className="text-white">Sign In</p>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
