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
        <div className="flex items-center">
          <Link href="/places">
            <div className="flex items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home mr-2 h-6 w-6"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zm9-2v9h4V7h5l-9-7-9 7h5z" />
              </svg>
              <p className="text-lg font-semibold">Places</p>
            </div>
          </Link>
        </div>
        {session ? (
          <div>
            {user?.email && (
              <Link href="/">
                <div className="mr-4 text-white">{user.email}</div>
              </Link>
            )}
            <Link href="/add">
              <div className="mr-4 text-white">Add new listing</div>
            </Link>
            <button onClick={() => supabase.auth.signOut()}>
              <p className="text-white">Sign Out</p>
            </button>
          </div>
        ) : (
          <button onClick={() => router.push("/signin")}>
            <p className="text-white">Sign In</p>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
