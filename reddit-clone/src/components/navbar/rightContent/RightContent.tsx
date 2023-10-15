import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { AuthButtons, AuthModal, Icons, UserMenu } from "../../index";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;
