'use client'
interface BotaoProps {
    readonly texto: string,
    readonly corBotao: string,
    readonly corTexto: string,
    readonly corBorda: string
    readonly disabled?: boolean;
    readonly onClick?: () => void;
    readonly type?: 'button' | 'submit';
}

export default function Botao({ texto, corBotao, corTexto, corBorda, type, disabled = false, onClick }: BotaoProps) {
    return (
        <button type={type} onClick={onClick} className={`flex ${corBotao} border-2 ${corBorda} cursor-pointer rounded-lg justify-center items-center my-3 h-11 w-7/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-botao-desativado`} disabled={disabled}>
            <p className={`${corTexto} font-semibold text-xl`}>{texto}</p>
        </button>
    )
}