import { useState } from 'react';
import Padrao from './components/Padrao';
import Uniodonto from './components/Uniodonto';

export default function App() {
  const [modeloAtivo, setModeloAtivo] = useState<'padrao' | 'uniodonto'>('padrao');

  return (
  <div className="min-h-screen bg-[url('./public/acisc-predio.jpg')] bg-no-repeat bg-cover bg-center text-slate-100">

    <div className='bg-slate-800/50 backdrop-blur-lg p-4'>

      <div className="absolute flex w-1/2 rounded-t-lg bg-slate-900">
        <button
          type="button"
          onClick={() => setModeloAtivo('padrao')}
          className={`flex-1 py-3 text-sm font-semibold hover:cursor-pointer rounded-t-md transition ${
            modeloAtivo === 'padrao' 
              ? 'bg-[#166b67] text-white shadow' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Proposta Padrão
        </button>
        <button
          type="button"
          onClick={() => setModeloAtivo('uniodonto')}
          className={`flex-1 py-3 text-sm font-semibold hover:cursor-pointer rounded-t-md transition ${
            modeloAtivo === 'uniodonto' 
              ? 'bg-[#166b67] text-white shadow' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Proposta + UNIODONTO
        </button>
      </div>

      <article>
        {modeloAtivo === 'padrao' ? <Uniodonto /> : <Padrao /> }
        {/* {modeloAtivo === 'padrao' ? <Padrao /> : <Uniodonto />} */}
      </article>

    </div>

  </div>
  );
}