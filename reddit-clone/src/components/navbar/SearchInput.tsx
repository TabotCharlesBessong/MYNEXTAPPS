import React from 'react'
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'

type SearchInputProps = {

}

const SearchInput:React.FC<SearchInputProps> = () => {
  return (
    <Flex>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
          // children={<SearchIcon mb={2} />}
        >
          <SearchIcon mb={2} />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  )
}

export default SearchInput