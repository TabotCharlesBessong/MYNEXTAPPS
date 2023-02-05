import React from 'react'
import { Flex, Icon, MenuDivider, MenuItem,Menu,MenuButton,MenuList,Text } from "@chakra-ui/react";
import {FaRedditSquare} from 'react-icons/fa'
import { useResetRecoilState,useSetRecoilState } from "recoil";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import {VscAccount} from 'react-icons/vsc'
import {ChevronDownIcon} from '@chakra-ui/icons'
import {signOut,User} from 'firebase/auth'
import { auth } from '@/src/firebase/clientApp'
import { authModalState } from '@/src/atoms/authModalAtom'
import { communityState } from '@/src/atoms/communitiesAtom'
import {IoSparkles} from 'react-icons/io5'

type UserMenuProps = {
  user?:User | null
}


const UserMenu:React.FC<UserMenuProps> = ({user}) => {
  const resetCommunityState = useResetRecoilState(communityState)
  const Logout = async () => {
    await signOut(auth)
    resetCommunityState()
    // clear community
  }
  const setAuthModalState = useSetRecoilState(authModalState)
  return (
    <Menu>
      <MenuButton cursor='pointer' padding='0px 6px' borderRadius={4} _hover={{outline:'1px solid',outlineColor:'gray.200'}} >
        <Flex align='center'>
          <Flex align='center'>
          {user ? (
            <>
              <Icon fontSize={24} color='gray.300' as={FaRedditSquare} />
              <Flex display={{base:'none',lg:'flex'}} direction='column' align='flex-start' mr={5} >
                <Text fontWeight={700} >
                  {user.displayName || user.email.split('@')[0]}
                </Text>
                <Flex>
                  <Icon as={IoSparkles} color='brand.300' mr={2} />
                  <Text  color='brand.300' mr={2} >
                    1 Karma
                  </Text>
                </Flex>
              </Flex>
            </>
         
         ) : (
           <Icon fontSize={24} color='gray.400' as={VscAccount} />
           )}
          </Flex>
        <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={CgProfile} />
          Profile
        </Flex>
      </MenuItem>
      <MenuDivider />
      <MenuItem
        fontSize="10pt"
        fontWeight={700}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={Logout}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
          Log Out
        </Flex>
      </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
            fontSize='10pt'
            fontWeight={700}
            _hover={{bg:'blue.500',color:'white'}}
            onClick={() => setAuthModalState({open:true,view:'login'})}
            >
              <Flex>
                <Icon as={MdOutlineLogin} />
                Login/Sign up
              </Flex>
            </MenuItem>
          </>
        )}
        
      </MenuList>
    </Menu>
  )
}

export default UserMenu