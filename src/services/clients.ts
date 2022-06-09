import httpClient from "../http-client";
import { Client } from "../models/client";

export const getClients = async (): Promise<Client[]> => {
  const clients = (await httpClient.get(`/clients/`)).data;

  return clients;
};

export const createClient = async (newClient: Client) => {
  if (!newClient) {
    throw new Error("Os dados para criação do cliente são obrigatórios");
  }

  const response = await httpClient({
    method: "post",
    url: "/clients",
    data: newClient,
  });

  return response;
};

export const deleteClient = async (clientId: number) => {
  if (!clientId) {
    throw new Error("ID obrigatório para exclusão!");
  }

  const response = await httpClient.delete(`/clients/${clientId}`);

  return response;
};

export const updateClient = async (clientId: number, newClient: Client) => {
  if (!clientId) {
    throw new Error("ID obrigatório para edição de anotação!");
  }

  if (!newClient) {
    throw new Error("Dados para edição não encontrados!");
  }

  const response = await httpClient({
    method: "put",
    url: `/clients/${clientId}`,
    data: newClient,
  });

  return response;
};
