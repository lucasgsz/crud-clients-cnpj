import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createClient,
  deleteClient,
  getClients as getClientsService,
  updateClient,
} from "../services/clients";
import { Client } from "../models/client";

export type ClientsContextData = {
  clients: Client[];
  handleRequestNewClients: () => void;
  handleCreateClient: (data: Client) => void;
  handleEditClient: (clientId: number, data: Client) => void;
  handleDeleteClient: (id: number) => void;
  handleSearchClient: (nameToFind: string) => void;
};

export const ClientsContext = createContext<ClientsContextData>(
  {} as ClientsContextData
);

const ClientsProvider = ({ children }: { children: React.ReactNode }) => {
  const [rawClients, setRawClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>(rawClients);
  const [requestNewClients, setRequestNewClients] = useState(false);

  const getClients = useCallback(async () => {
    try {
      const clients = await getClientsService();
      setRawClients(clients);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getClients();
  }, [getClients, requestNewClients]);

  useEffect(() => {
    setClients(rawClients);
  }, [rawClients]);

  const handleRequestNewClients = () => {
    setRequestNewClients(!requestNewClients);
  };

  const handleSearchClient = (nameToFind: string) => {
    if (nameToFind) {
      setClients(
        rawClients.filter((client) =>
          client.razao_social.toLowerCase().includes(nameToFind.toLowerCase())
        )
      );
    } else {
      setClients(rawClients);
    }
  };

  const handleCreateClient = async (data: Client) => {
    await createClient(data);
    handleRequestNewClients();
  };

  const handleEditClient = async (clientId: number, data: Client) => {
    await updateClient(clientId, data);
    handleRequestNewClients();
  };

  const handleDeleteClient = async (id: number) => {
    await deleteClient(id);
    handleRequestNewClients();
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        handleRequestNewClients,
        handleCreateClient,
        handleEditClient,
        handleDeleteClient,
        handleSearchClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

const useClients = () => useContext(ClientsContext);

export { ClientsProvider, useClients };
