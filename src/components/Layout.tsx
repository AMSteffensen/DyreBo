import { ReactNode } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {!session ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={[]}
            />
          </div>
        </div>
      ) : (
        <div>
          <main className="grow">{children}</main>
        </div>
      )}
    </div>
  );
};

export default Layout;
