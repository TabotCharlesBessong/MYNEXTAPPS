import HomePage from "@/components/HomePage";
import Image from "next/image";
import client from "../../tina/__generated__/client";

export default async function Home() {
  const res = await client.queries.page({relativePath:"benjamin.json"})
  return (
    <HomePage data={res.data} variables={res.variables} query={res.query} />
  );
}
