import PlaceList from "@/components/PlaceList";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, []);
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="hero">
          <h1 className="mb-4 text-3xl font-bold">Lorem Ipsum</h1>
          <p className="mb-4 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac gravida nisi, sit amet ultrices tellus.
          </p>
          <Link href="/places">
            <button className="inline-block w-full rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg lg:w-auto">
              Explore Places
            </button>
          </Link>
        </div>
      </div>
      <PlaceList />
    </main>
  );
}
