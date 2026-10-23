
import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { ToothIcon, ClipboardTextIcon } from "@phosphor-icons/react";


export function formatarMoeda(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (!apenasNumeros) return '';
    const valorNumero = Number(apenasNumeros) / 100;

    return valorNumero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    });
}

export default function PropostaPadrao() {
    const [empresa, setEmpresa] = useState('');
    const [valorMensal, setValorMensal] = useState('');
    // const [valorInscricao, setValorInscricao] = useState('');
    // const [valorMensalUniodonto, setValorMensalUniodonto] = useState('');
    const [consultor, setConsultor] = useState('');
    const [whatsConsultor, setWhatsConsultor] = useState('');
    const [emailConsultor, setEmailConsultor] = useState('');
    const [validadeProposta, setValidadeProposta] = useState('');



    const hoje = new Date().toISOString().split('T')[0];

    const formatarData = (dataIso: string) => {
        if (!dataIso) return "";
        const [ano, mes, dia] = dataIso.split("-");
        return `${dia}/${mes}/${ano}`;
    };

    const templateRef = useRef<HTMLDivElement>(null);

    const baixarImagemFinal = async () => {
        if (templateRef.current === null) return;

        try {
            const larguraVisivel = templateRef.current.clientWidth;
            
            const larguraOriginal = 2480;

            const ratio = larguraOriginal / larguraVisivel;

            const dataUrl = await toPng(templateRef.current, {
            cacheBust: true,
            pixelRatio: ratio,
            });

            const link = document.createElement('a');
            link.download = `Proposta_${empresa || ''}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Erro', err);
        }
    };


return(
<div>
    <div className="flex flex-col gap-8 md:flex-row justify-between rounded-xl">

    <div className="w-1/2 space-y-4 bg-slate-800 p-6 border-slate-700">

    <h1 className="text-xl font-bold">Preencha os Dados da Proposta</h1>

    <div>
        <label className="block text-sm text-slate-400 mb-1">Empresa</label>
        <input
        type="text"
        value={empresa}
        maxLength={38}
        onChange={(e) => setEmpresa(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded p-2 mb-2 text-white"
        />
    </div>

    <div>
        <label className="block text-sm text-slate-400 mb-1">Valor da Mensalidade ACISC</label>
        <NumericFormat
        value={valorMensal}
        onValueChange={(values) => setValorMensal(values.formattedValue)}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        maxLength={13}
        fixedDecimalScale
        placeholder="R$ 0,00"
        className='w-full flex gap-2 bg-slate-800 border border-slate-700 rounded p-2 text-slate-300 font-semibold'
        />
    </div>

    <div className='bg-emerald-700/40'>
        <span className='font-bold text-md mb-3 flex gap-1 items-center'><ToothIcon size={24} color="#f0f0f0" weight="fill" /> UNIODONTO</span>
        <div className='grid grid-cols-2 gap-4 w-full '>
            <div>
                <label className="flex text-sm gap-2 font-semibold items-center text-slate-200 mb-1">
                    <ClipboardTextIcon size={24} color="#e7e7e5" weight="duotone" /> Valor Inscrição UNIODONTO
                </label>
                <PatternFormat
                value={whatsConsultor}
                onValueChange={(values) => setWhatsConsultor(values.formattedValue)}
                format='(##) #####-####'
                placeholder="(16) #####-####"
                className='w-full bg-slate-800 border border-slate-700 rounded p-2 font-semibold'
                />
            </div>
                
            <div>
                <label className="block text-sm text-slate-400 mb-1">Valor Mensalidade UNIODONTO</label>
                <input
                type='email'
                onChange={(e) => setEmailConsultor(e.target.value)}              
                placeholder="consultor@acisc.com.br"
                className='w-full flex gap-2 bg-slate-800 border border-slate-700 rounded p-2 text-slate-300 font-semibold'
                />
            </div>
        </div>

    </div>

    <div>
        <label className="block text-sm text-slate-400 mb-1">Consultor Comercial</label>
        <input
        type='text'
        onChange={(e) => setConsultor(e.target.value)}              
        placeholder="Nome do Consultor"
        className='w-full flex gap-2 bg-slate-800 border border-slate-700 rounded p-2 text-slate-300 font-semibold'
        />
    </div>


    <div className='grid grid-cols-2 gap-4 w-full'>
        <div>
            <label className="block text-sm text-slate-400 mb-1">WhatsApp</label>
            <PatternFormat
            value={whatsConsultor}
            onValueChange={(values) => setWhatsConsultor(values.formattedValue)}
            format='(##) #####-####'
            placeholder="(16) #####-####"
            className='w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-300 font-semibold'
            />
        </div>
            
        <div>
            <label className="block text-sm text-slate-400 mb-1">E-mail</label>
            <input
            type='email'
            onChange={(e) => setEmailConsultor(e.target.value)}              
            placeholder="consultor@acisc.com.br"
            className='w-full flex gap-2 bg-slate-800 border border-slate-700 rounded p-2 text-slate-300 font-semibold'
            />
        </div>
    </div>

    <div className='mb-12'>
        <label className="block text-sm text-slate-400 mb-1">Propósta Válida até</label>
        <input
        type={validadeProposta ? "date" : "text"}
        min={hoje}
        value={validadeProposta}
        onChange={(e) => setValidadeProposta(e.target.value)}             
        placeholder="Sem data definida"
        onFocus={(e) => e.target.type = 'date'}
        onBlur={(e) => {
            if (!e.target.value) e.target.type = 'text';
        }}
        className='w-fit bg-slate-800 border border-slate-700 rounded p-2 text-slate-300 font-semibold'
        />
    </div>

        <button
        onClick={baixarImagemFinal}
        className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 hover:cursor-pointer font-semibold py-2.5 rounded-lg transition"
        >
        Gerar Proposta
        </button>

    </div>


    <div className="flex flex-col w-1/2 items-center py-4 bg-slate-700/30 rounded-2xl">
        <p className="text-xs text-slate-400 mb-2">Pré-visualização</p>

    <div ref={templateRef} className="relative border-slate-700 border-2 max-h-[90vh] w-auto overflow-hidden rounded-lg shadow-xl flex items-center justify-center">
        <img 
            src="/modelo_uniodonto.png" 
            alt="Modelo Base" 
            className="max-h-[90vh] w-auto object-contain" 
        />

        <div className="absolute top-[13.2%] left-[29.6%] text-[#166b67] font-bold text-[13px]">
            {empresa || 'EMPRESA TESTE'}
        </div>

        <div className="absolute top-[44%] left-[19%] text-slate-600 font-bold text-[16px]">
            {valorMensal ? `${valorMensal} / mês` : 'R$ -- / mês'}
        </div>

        <div className="absolute top-[87.5%] left-[8%] text-[#166b67] font-bold text-[9px]">
            {consultor ? `${consultor}` : 'Lucas Santana'}
        </div>

        <div className="absolute top-[90%] left-[10%] text-[#166b67] font-bold text-[7px]">
            {whatsConsultor ? `${whatsConsultor}` : '16 99723 1736'}
        </div>

        <div className="absolute top-[92.3%] left-[10%] text-[#166b67] font-bold text-[7px]">
            {emailConsultor ? `${emailConsultor}` : 'lucas@acisc'}
        </div>

        <div className="absolute top-[85%] left-[78%] text-[#166b67] font-bold text-[6px]">
            {validadeProposta ? `Proposta válida até ${formatarData(validadeProposta)}` : ''}
        </div>



    </div>

    </div>

    </div>
</div>
)
}
