import { authModalState } from "@/src/atoms/authModalAtom";
import useDirectory from "@/src/hooks/useDirectory";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import { useSetRecoilState } from "recoil";
import { Communities } from "../../index";

const Directory: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        onClick={toggleMenuOpen}
        mr={2}
        ml={{ base: 0, md: 2 }}
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                width="50"
                height="50"
                rounded="full"
                src={directoryState.selectedMenuItem.imageURL}
                alt=""
              />
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                mr={{ base: 1, md: 2 }}
                color={directoryState.selectedMenuItem.iconColor}
              />
            )}
            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontSize="10pt" fontWeight={600}>
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
