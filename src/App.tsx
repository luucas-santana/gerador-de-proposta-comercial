import React, { useState, useRef } from 'react';
import {PatternFormat, NumericFormat, type NumberFormatValues } from 'react-number-format';
import { toPng } from 'html-to-image';
import { Padrao } from './components/Padrao';
import { Uniodonto } from './components/Uniodonto';
import { ToothIcon, BuildingIcon, CurrencyDollarIcon, UserIcon, WhatsappLogoIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";


export function formatarMoeda(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (!apenasNumeros) return '';
    const valorNumero = Number(apenasNumeros) / 100;

    return valorNumero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    });
}

export default function App() {
  const [tipoModelo, setTipoModelo] = useState<'padrao' | 'uniodonto'>('padrao');
  
  const [formData, setFormData] = useState({
    empresa: '',
    valorMensal: '',
    valorInscricaoUniodonto: '',
    valorMensalUniodonto: '',
    consultor: '',
    whatsapp: '',
    email: '',
  });

  const templateRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNumericChange = (name: string, values: NumberFormatValues) => {
    setFormData(prev => ({
      ...prev,
      [name]: values.formattedValue
    }));
  };

  const handleGerarImagem = async () => {
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
      link.download = `Proposta_${formData.empresa || 'Cliente'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
    }
  };

  return (
  <div className="min-h-screen bg-center bg-cover bg-fixed bg-no-repeat bg-[url('./public/acisc.webp')]">

    <div className="min-h-screen bg-slate-900/70 backdrop-blur-sm p-6 text-slate-100 flex flex-col items-center">

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700">
          
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setTipoModelo('padrao')}
                className={`py-3 cursor-pointer active:scale-95 px-4 rounded-xl font-bold transition-all ${
                  tipoModelo === 'padrao' 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Proposta Comercial
              </button>

              <button 
                onClick={() => setTipoModelo('uniodonto')}
                className={`py-3 cursor-pointer active:scale-95 px-4 rounded-xl font-bold transition-all ${
                  tipoModelo === 'uniodonto' 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Proposta + Uniodonto
              </button>
              
            </div>

          </div>

          <hr className="border-slate-700" />

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-200">
              Preencha os Dados da Proposta
            </h2>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm gap-1 text-emerald-400 mb-1 font-semibold flex">
                  <BuildingIcon size={20} color="#00d492" weight="fill" /> Empresa
                </label>
                <input 
                  name="empresa" 
                  placeholder="Nome da Empresa" 
                  value={formData.empresa} 
                  onChange={handleChange} 
                  maxLength={38}
                  className="w-full bg-slate-900 border text-xs font-semibold border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="text-sm gap-1 text-emerald-400 mb-1 font-semibold flex">
                  <CurrencyDollarIcon size={20} color="#00d492" weight="fill" />
                  Valor da Mensalidade ACISC
                </label>
                <NumericFormat
                value={formData.valorMensal}
                onValueChange={(values) => handleNumericChange('valorMensal', values)}
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                maxLength={10}
                fixedDecimalScale
                placeholder="R$ 0,00"
                className="w-full bg-slate-900 border text-xs font-semibold border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500"/>
              </div>

              {/* UNIODONTO */}
              {tipoModelo === 'uniodonto' && (
                <div className="flex flex-col gap-3 p-4 bg-emerald-600/40 border border-emerald-500/50 rounded-xl">
                  <span className="text-sm flex gap-1 font-bold text-emerald-400 tracking-wider"><ToothIcon size={20} color="#00d492" weight="fill" /> UNIODONTO</span>
                  
                  <div>
                    <label className="text-sm gap-1 text-emerald-400 mb-1 font-semibold flex">
                      Valor Inscrição Uniodonto
                    </label>
                    <NumericFormat
                    value={formData.valorInscricaoUniodonto}
                    onValueChange={(values) => handleNumericChange('valorInscricaoUniodonto', values)}
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    maxLength={10}
                    fixedDecimalScale
                    placeholder="R$ 0,00"
                    className="w-full bg-slate-900 text-xs border font-semibold border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500"/>
                  </div>

                  <div>
                    <label className="text-sm gap-1 text-emerald-400 mb-1 font-semibold flex">
                      Valor Mensal Uniodonto
                    </label>
                    <NumericFormat
                    value={formData.valorMensalUniodonto}
                    onValueChange={(values) => handleNumericChange('valorMensalUniodonto', values)}
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    maxLength={10}
                    fixedDecimalScale
                    placeholder="R$ 0,00"
                    className="w-full bg-slate-900 text-xs border font-semibold border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500"/>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm gap-1 text-emerald-400 mb-1 font-semibold flex">
                    <UserIcon size={20} color="#00d492" weight="fill" />
                    Consultor
                  </label>
                  <input 
                    name="consultor" 
                    placeholder="Seu Nome" 
                    value={formData.consultor} 
                    onChange={handleChange} 
                    className="w-full bg-slate-900 text-xs font-semibold border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="text-sm gap-1 text-emerald-400 mb-1 font-semibold flex">
                    <WhatsappLogoIcon size={20} color="#00d492" weight="fill" />
                    WhatsApp
                  </label>
                <PatternFormat
                value={formData.whatsapp}
                onValueChange={(values) => handleNumericChange('whatsapp', values)}
                format='(##) #####-####'
                placeholder="(16) 00000-0000"
                  className="w-full bg-slate-900 text-xs border font-semibold border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500"/>
                </div>
              </div>

              <div>
                <label className="text-sm gap-1 text-emerald-400 mb-1 font-semibold flex">
                  <EnvelopeSimpleIcon size={20} color="#00d492" weight="fill" />
                  E-mail
                </label>
                <input 
                  name="email" 
                  placeholder="seu@email.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full bg-slate-900 text-xs border font-semibold border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500" 
                />
              </div>

            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6">
          
          <div className="w-full flex justify-center">
            {tipoModelo === 'padrao' ? (
              <Padrao templateRef={templateRef} dados={formData} />
            ) : (
              <Uniodonto templateRef={templateRef} dados={formData} />
            )}
          </div>

          <button 
            onClick={handleGerarImagem}
            className="w-full max-w-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            Gerar Proposta
          </button>
        </div>

      </div>

    </div>

  </div>
  );
}