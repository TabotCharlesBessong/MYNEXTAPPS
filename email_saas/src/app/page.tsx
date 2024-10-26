
import { Button } from "~/components/ui/button";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <h1 className="text-3xl text-orange-600" >Hello Wolrd!</h1>
      <Button>Get Started</Button>
    </HydrateClient>
  );
}
