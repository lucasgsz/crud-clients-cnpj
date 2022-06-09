import React, { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useClients } from "../../context/ClientsContext";
import { UserEditForm } from "../UserEditForm";
import { Modal } from "../Modal";
import { Client } from "../../models/client";

export const CustomerList: React.FC = () => {
  const { clients, handleDeleteClient } = useClients();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clientToEdit, setClientToEdit] = useState<Client>({} as Client);

  const handleEditClient = (client: Client) => {
    setClientToEdit(client);
    onOpen();
  };

  return (
    <>
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome/Razão Social</Th>
              <Th>CPF/CNPJ</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Celular</Th>
              <Th>Editar/Apagar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client) => {
              return (
                <Tr key={client.id}>
                  <Td>{client.id}</Td>
                  <Td>{client.razao_social}</Td>
                  <Td>{client.cnpj}</Td>
                  <Td>{client.email}</Td>
                  <Td>{client.telefone_responsavel}</Td>
                  <Td>{client.celular_responsavel}</Td>
                  <Td>
                    <ButtonGroup>
                      <IconButton
                        aria-label="Search database"
                        colorScheme="blue"
                        onClick={() => handleEditClient(client)}
                        icon={<EditIcon />}
                      />
                      <IconButton
                        colorScheme="red"
                        aria-label="Search database"
                        onClick={() => handleDeleteClient(Number(client.id))}
                        icon={<DeleteIcon />}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} title={"Editar Cliente"}>
        <UserEditForm onClose={onClose} client={clientToEdit} />
      </Modal>
    </>
  );
};
