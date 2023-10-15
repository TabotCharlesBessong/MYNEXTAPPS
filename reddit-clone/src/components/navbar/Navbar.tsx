import { auth } from "@/src/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Directory, RightContent, SearchInput } from "../index";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      justifyContent={{ md: "space-between" }}
      bg="white"
      height="44px"
      padding="6px 12px"
    >
      <Flex
        width={{ base: "40px", md: "auto" }}
        align="center"
        mr={{ base: 0, md: 2 }}
      >
        <Link href="/">
          <Image src="/images/redditFace.svg" alt="" height={30} />
        </Link>
        <Image
          src="/images/redditText.svg"
          alt=""
          height={46}
          display={{
            base: "none",
            md: "unset",
          }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
