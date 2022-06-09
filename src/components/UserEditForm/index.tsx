import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Box, Button, Center, Flex, HStack, Radio } from "@chakra-ui/react";

import {
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  RadioGroupControl,
  TextareaControl,
} from "formik-chakra-ui";
import { useClients } from "../../context/ClientsContext";
import { Client } from "../../models/client";

type IProps = {
  onClose: () => void;
  client: Client;
};

export const UserEditForm: React.FC<IProps> = ({ onClose, client }) => {
  const { handleEditClient } = useClients();

  const onSubmit = async (values: any) => {
    try {
      await handleEditClient(client.id, values);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = client;

  const validationSchema = Yup.object({
    nome_fantasia: Yup.string().required("Campo Obrigatório"),
    cnpj: Yup.number().required("Campo Obrigatório"),
    ativo: Yup.boolean().required("Campo Obrigatório"),
    email: Yup.string().required("Campo Obrigatório"),
    observacao: Yup.string(),
    contribuinte: Yup.boolean().required("Campo Obrigatório"),
    cep: Yup.number().required("Campo Obrigatório"),
    tipo_logradouro: Yup.string().required("Campo Obrigatório"),
    logradouro: Yup.string().required("Campo Obrigatório"),
    numero: Yup.number().required("Campo Obrigatório"),
    complemento: Yup.string(),
    bairro: Yup.string().required("Campo Obrigatório"),
    cidade: Yup.string().required("Campo Obrigatório"),
    estado: Yup.string().required("Campo Obrigatório"),
    razao_social: Yup.string().required("Campo Obrigatório"),
    nome_responsavel: Yup.string(),
    cpf_responsavel: Yup.number(),
    data_nascimento_responsavel: Yup.string(),
    telefone_responsavel: Yup.number(),
    celular_responsavel: Yup.number(),
    email_responsavel: Yup.string(),
    inscricao_municipal: Yup.string(),
    inscricao_estadual: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit as any}>
          <Flex flexDirection="column" gap={10} paddingBottom={10}>
            <Flex flexDirection="column" gap={3}>
              <HStack>
                <InputControl name="razao_social" label="Razão Social" />
                <InputControl name="nome_fantasia" label="Nome Fantasia" />
                <CheckboxSingleControl name="ativo">
                  Ativo
                </CheckboxSingleControl>
              </HStack>
              <HStack>
                <NumberInputControl name="cnpj" label="CNPJ" />
                <RadioGroupControl name="contribuinte" label="Contribuinte">
                  <Radio value="true">Sim</Radio>
                  <Radio value="false">Não</Radio>
                </RadioGroupControl>
              </HStack>
              <HStack>
                <InputControl
                  name="inscricao_estadual"
                  label="Insc. Estadual"
                />
                <InputControl
                  name="inscricao_municipal"
                  label="Insc. Municipal"
                />
              </HStack>
            </Flex>

            <Flex flexDirection="column" gap={3}>
              <InputControl name="email" label="E-mail" />

              <InputControl
                name="nome_responsavel"
                label="Nome do Responsavel"
              />
              <HStack>
                <NumberInputControl name="cpf_responsavel" label="CPF" />
                <InputControl
                  name="data_nascimento_responsavel"
                  label="Data Nasc. Responsavel"
                />
              </HStack>
              <HStack>
                <NumberInputControl
                  name="telefone_responsavel"
                  label="Telefone"
                />
                <NumberInputControl
                  name="celular_responsavel"
                  label="Celular"
                />
                <InputControl
                  name="email_responsavel"
                  label="E-mail Responsavel"
                />
              </HStack>
            </Flex>

            <Flex flexDirection="column" gap={3}>
              <HStack>
                <NumberInputControl name="cep" label="CEP" />
                <InputControl name="estado" label="Estado" />
                <InputControl name="cidade" label="Cidade" />
              </HStack>
              <HStack>
                <InputControl name="tipo_logradouro" label="Tipo Logradouro" />
                <InputControl name="logradouro" label="Logradouro" />
                <NumberInputControl name="numero" label="Número" />
              </HStack>
              <HStack>
                <InputControl name="bairro" label="Bairro" />
                <InputControl name="complemento" label="Complemento" />
              </HStack>
            </Flex>

            <Box>
              <TextareaControl name="observacao" label="Observação" />
            </Box>
          </Flex>
          <Center>
            <Button type="submit" colorScheme="teal">
              Salvar
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
};
