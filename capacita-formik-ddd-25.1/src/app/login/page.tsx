"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "../components/input"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Botao from "../components/botao";
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';
import api from "../../src/axios";

// A validação com Yup 
const validationSchema = Yup.object({
  email: Yup
    .string()
    .email("Email inválido")
    .required("Esse campo é obrigatório"),

  senha: Yup.string()
    .required("Esse campo é obrigatório")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});

interface LoginData {
  email: string;
  senha: string;
}

interface LoginResponse {
  payload: {
    email: string;
    nome: string;
  };
}

  export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // const { signIn } = useAuth(); // Você reativaria seu contexto de autenticação

  // Função onSubmit integrada ao Formik para lidar com a API
  async function handleLogin(values: LoginData, actions: any) {
    try {
      // A chamada a API é feita aqui
      const response = await api.post<LoginResponse>("/auth/login", values);
      console.log("Login bem-sucedido:", response.data.payload);

      // Sucesso: Salve os dados e redirecione
      // signIn(response.data.payload); // Salvaria no context
      
      router.push('/home');

    } catch (error: any) {
      console.error("Erro no login:", error.response?.data);

      

    } finally {
      actions.setSubmitting(false); // Finaliza o estado de submissão
      
    }
  }

  return (
    <div className="w-screen h-screen bg-orange-400 grid grid-cols-2">
     
      {/*Lado esquerdo da tela, com fundo preto, contendo logo, anuncio e imagem */}
            <div className="col-span-1 flex flex-col items-center justify-between border- border-black 
            ">

                {/*Logo da empresa*/}
                <div className="w-full h-[15%] flex flex-col items-start justify-start border-
                 bg-black rounded-tr-full border-black">

                  <Image
                  
                    src="/images/logo.png"
                    alt="Logo"
                    width={180}  
                    height={180}
                    className="rounded-md object-cover"
                    
                  />


                 

                </div>

                {/*Area do anuncio "Faca seu orcamento" */}
                <div className="w-full h-[85%] flex text-cinza-fundo flex-col border- border-red-600 gap-4.5 
                text-center items-center justify-center bg-black">
                  
                  <div className="border- font-inter font-extrabold flex flex-col items-center justify-center">

                     <h1 className="text-[45px] border- w-[80%] flex-wrap text-start">FAÇA SEU PROJETO</h1>

                    <h2 className="text-[26px] w-[80%] text-start">Com a maior EJ do Brasil</h2>


                  </div>

                  <div className="flex justify-center items-center">
                    <div className="border- border-amber-600">

                      <Image 
                        src="/images/codigo.png"
                        alt="imagem"
                        width={450}   
                        height={250}
                        className="rounded-md object-cover"
                      />

                    </div>
                  </div>
                    
                </div>


                

            </div>

      {/* Lado Direito - Formulário */}
      <div className="col-span-1 flex flex-col items-center justify-center overflow-auto">
        <div className="w-[65%] text-center my-8">
          <h2 className="font-inter text-2xl font-bold mt-8">Entrar</h2>
        </div>

        <div className="w-[65%] bg-white p-6 rounded-2xl shadow-md">
          {/* O Formik gerencia todo o estado do formulário */}
          <Formik
            initialValues={{ email: "", senha: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center">

                <div className="w-[75%] flex flex-col ">

                  <InputText
                  name="email"
                  type="email"
                  label="E-mail"
                  placeholder="seuemail@exemplo.com"
                  style="h-9 w-full p-2 pr-10 bg-gray-200"
                />
                
                

                <div className="relative w-full my-2 ">
                  <InputText
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    label="Senha"
                    placeholder="********"
                    style="h-9 w-full p-2 pr-10 bg-gray-200"
                  />
                  <div
                    className="absolute top-9 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </div>
                </div>

              </div>

                <label className="flex items-center gap-2 w-[75%] my-2 text-sm text-black">
                  <input type="checkbox" className="w-4 h-4 accent-orange-500" />
                  Lembre-se de mim
                </label>

                <Botao
                  type="submit"
                  texto={isSubmitting ? "Entrando..." : "Entrar"}
                  corBotao="bg-black hover:bg-orange-400 "
                  disabled={isSubmitting} // Desabilita o botão durante a "requisição"
                  corTexto="text-white" 
                  corBorda="border-transparent"
                />

                <div className="w-[75%] mt-4 text-black text-center">
                  <Link href="/esqueci_senha" className="underline text-sm">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="w-[65%] flex flex-col text-center mt-4 mb-8 text-white justify-center items-center">
            <h3>Ainda não possui uma conta?</h3>
            <Botao
                onClick={() => router.push("/cadastro")}
                texto="Cadastre-se"
                corBotao="bg-black mt-2"
                type="button"
                corTexto="text-white" 
                corBorda="border-transparent"
            />
        </div>
      </div>
    </div>
  );
}