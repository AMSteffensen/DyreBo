import { useEffect, useState } from "react";

type ListingsTableProps = {
  user: any;
  supabase: any;
};

export default function ListingsTable({ user, supabase }: ListingsTableProps) {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data } = await supabase
        .from("listings")
        .select("*")
        .match({ user_id: user.id });
      setListings(data || []);
    } catch (error) {
      // @ts-ignore
      console.error("Error fetching listings:", error.message);
      // @ts-ignore
    }
  };

  const handleDelete = async (listingId: string) => {
    try {
      await supabase.from("listings").delete().match({ id: listingId });
      fetchListings();
      alert("Listing deleted successfully!");
    } catch (error) {
      // @ts-ignore
      console.error("Error deleting listing:", error.message);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listings.map((listing) => (
          <tr key={listing.id}>
            <td>{listing.title}</td>
            <td>{listing.description}</td>
            <td>
              <button onClick={() => handleDelete(listing.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
