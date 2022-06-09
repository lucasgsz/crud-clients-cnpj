import React from "react";
import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { CustomerList } from "../../components/CustomerList";
import { useClients } from "../../context/ClientsContext";
import { Modal } from "../../components/Modal";
import { UserRegistrationForm } from "../../components/UserRegistrationForm";

export const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSearchClient } = useClients();

  return (
    <>
      <Center>
        <SimpleGrid
          row={2}
          spacing={5}
          width={["100%", "1400px"]}
          margin={["100px"]}
        >
          <Flex justifyContent={"space-between"}>
            <Button onClick={onOpen}>Adicionar Cliente</Button>
            <InputGroup width={"400px"}>
              <Input
                placeholder="Buscar Clientes"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleSearchClient(e.currentTarget.value)
                }
              />
              <InputRightElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
            </InputGroup>
          </Flex>
          <CustomerList />
        </SimpleGrid>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} title={"Adicionar Cliente"}>
        <UserRegistrationForm onClose={onClose} />
      </Modal>
    </>
  );
};
