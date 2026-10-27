interface ModeloProps {
    templateRef: React.RefObject<HTMLDivElement | null>;
    dados: {
        empresa: string;
        valorMensal: string;
        consultor: string;
        whatsapp: string;
        email: string;
        valorInscricaoUniodonto: string;
        valorMensalUniodonto: string;
    };
}

export const Uniodonto = ({ templateRef, dados }: ModeloProps) => {
    
    return (
    <div ref={templateRef} className="relative w-auto overflow-hidden shadow-xl flex items-center justify-center bg-white">
        <img 
        src="/modelo_uniodonto.webp" 
        alt="Modelo Uniodonto" 
        className="max-h-[80vh] w-auto object-contain block" 
        />

        <div className="absolute top-[13.2%] left-[29.6%] text-[#166b67] font-bold text-[10px]">
            {dados.empresa || ''}
        </div>

        <div className="absolute top-[44.5%] left-[19%] text-slate-600 font-bold text-[12px]">
            {dados.valorMensal ? `${dados.valorMensal} / mês` : ''}
        </div>

        <div className="absolute top-[44.4%] left-[65.5%] text-slate-600 font-bold text-[10px]">
            {dados.valorInscricaoUniodonto ? `${dados.valorInscricaoUniodonto}` : ''}
        </div>

        <div className="absolute top-[49%] left-[65.5%] text-slate-600 font-bold text-[10px]">
            {dados.valorMensalUniodonto ? `${dados.valorMensalUniodonto}` : ''}
        </div>


        <div className="absolute top-[87.7%] left-[8%] text-[#166b67] font-bold text-[8px]">
            {dados.consultor ? `${dados.consultor}` : ''}
        </div>

        <div className="absolute top-[90%] left-[10%] text-[#166b67] font-bold text-[6px]">
            {dados.whatsapp ? `${dados.whatsapp}` : ''}
        </div>

        <div className="absolute top-[92.3%] left-[10%] text-[#166b67] font-bold text-[6px]">
            {dados.email ? `${dados.email}` : ''}
        </div>

    </div>
    );
};


 