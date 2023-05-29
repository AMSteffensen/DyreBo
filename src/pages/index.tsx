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
          <h1 className="text-3xl font-bold mb-4">Lorem Ipsum</h1>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac gravida nisi, sit amet ultrices tellus.
          </p>
          <Link href="/places">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg inline-block w-full lg:w-auto">
              Explore Places
            </button>
          </Link>
        </div>
      </div>
      <PlaceList />
    </main>
  );
}
