import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { Box } from "@chakra-ui/react";
import type { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function Home() {
  const { data: session } = useSession();
  console.log("clientSession", session);
  // node v16.14.2, npm 8.5.0
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Box>
      {session?.user?.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
