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


// 1. Schema de validação com Yup
const validationSchema = Yup.object({
  nome: Yup.string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .required("O campo nome é obrigatório"),
  email: Yup.string()
    .email("Formato de e-mail inválido")
    .required("O campo e-mail é obrigatório"),
  senha: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
    .required("O campo senha é obrigatório"),
  confirmacaoSenha: Yup.string()
    .oneOf([Yup.ref("senha")], "As senhas não são iguais")
    .required("Confirme sua senha"),
});

// 2. Valores iniciais correspondentes ao novo schema
const initialValues = {
  nome: '',
  email: '',
  senha: '',
  confirmacaoSenha: '',
};

export default function Cadastro() {
  // 3. Controle de estado de carregamento manual
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // 4. Função de submissão simplificada que controla o estado manualmente
  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    console.log("Iniciando cadastro manual...");
    setIsLoading(true); // Ativa o estado de carregamento manualmente

    try {
      // Simula uma chamada de API com duração de 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Dados do formulário:", values);
      alert(`Cadastro para "${values.nome}" realizado com sucesso!`);
      resetForm();
      router.push("/login");

    } catch (error) {
      console.error("Simulação de erro no cadastro:", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      console.log("Finalizando cadastro manual.");
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };
   
return(
        
        <div className="w-screen h-screen bg-orange-400 grid grid-cols-2">
               {/*Delimitando area total da tela */}
       
                   {/*Lado esquerdo da tela, com fundo preto, contendo logo, anuncio e imagem */}
                   <div className="h-screen col-span-1 flex flex-col items-center justify-between border- border-black 
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
                       <div className="w-full flex-1 flex text-cinza-fundo flex-col border- border-red-600 gap-4.5 
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
       
                   {/*Lado direito da tela, contendo o formulario de login */}
                   <div className="col-span-1 flex flex-col items-center justify-around border- border-black w-auto
                   overflow-y-auto">
       
                       <div className="flex flex-col items-center justify-center border- font-inter 
                       text-2xl font-bold mt-5 text-white">
       
                         <h2 className="text-[30px]  ">Cadastre-se</h2>

                         <div className="flex flex-row gap-2 text-xl">

                            <p>Já possuo uma conta!</p>

                            <Link href="/login"
                                className="text-white hover:text-black underline "> 
                                
                                Entrar

                            </Link>


                         </div>
       
                       </div>

                {/* Card do formulário */}
        <div className="w-[70%] bg-white p-8 rounded-2xl shadow-lg my-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {/* O 'isSubmitting' do Formik é ignorado aqui para usar o controle manual */}
            {() => (
              <Form className="flex flex-col items-center justify-center w-full">
                
                <InputText
                  name="nome"
                  type="text"
                  label="Nome"
                  placeholder="Insira seu nome completo"
                  style="h-9 w-[75%] p-2 pr-10 bg-gray-200"
                />

                <InputText
                  name="email"
                  type="email"
                  label="E-mail"
                  placeholder="seu.email@exemplo.com"
                  style="h-9 w-[75%] p-2 pr-10 bg-gray-200"
                />

                <div className="relative w-full flex flex-col items-center">
                    <label className="text-[#1E1E1E] font-inter font-bold text-lg w-[75%]">Senha</label>
                    <div className="relative w-[75%] my-2 ">
                        <InputText
                            name="senha"
                            type={showPassword ? "text" : "password"}
                            placeholder="Crie uma senha forte"
                            style="h-9 w-full p-2 pr-10 bg-gray-200"
                            
                        />
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </div>
                    </div>
                </div>

                <InputText
                  name="confirmacaoSenha"
                  type="password"
                  label="Confirme sua senha"
                  placeholder="Repita a senha criada"
                  style="h-9 w-[75%] p-2 pr-10 bg-gray-200"
                />

                <div className="flex flex-col  justify-center items-center w-full mt-8">
                  {/* Botão de confirmação usando o estado manual 'isLoading' */}
                  <Botao
                    corBorda="border-white"
                    corTexto="text-white"
                    texto={isLoading ? "Criando Conta..." : "Criar Conta"}
                    corBotao="bg-black hover:bg-orange-400"
                    disabled={isLoading} // O botão é desabilitado pelo estado manual
                    type="submit"
                    
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}