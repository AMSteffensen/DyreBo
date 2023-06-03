import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import "../styles/globals.css";
import Layout from "@/components/Layout";

type MyAppProps = {
  Component: React.ComponentType<any>;
  pageProps: any;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      // options: {
      //   // Additional options for the Supabase client
      // },
      // cookieOptions: {
      //   // Additional options for the cookie
      // },
    })
  );

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}

export default MyApp;
