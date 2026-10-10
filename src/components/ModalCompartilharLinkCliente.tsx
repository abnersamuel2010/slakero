import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  QrCode,
  Smartphone,
  UtensilsCrossed,
  MessageCircle,
} from 'lucide-react';

interface ModalCompartilharLinkClienteProps {
  aberto: boolean;
  onClose: () => void;
  nomeRestaurante: string;
  onVerComoCliente?: () => void;
}

export const ModalCompartilharLinkCliente: React.FC<
  ModalCompartilharLinkClienteProps
> = ({ aberto, onClose, nomeRestaurante, onVerComoCliente }) => {
  const [copiado, setCopiado] = useState(false);
  const [mostrarQr, setMostrarQr] = useState(false);

  if (!aberto) return null;

  // Montar link direto do portal do cliente
  const urlAtual = typeof window !== 'undefined' ? window.location : null;
  const baseUrl = urlAtual
    ? `${urlAtual.origin}${urlAtual.pathname}`
    : 'https://seurestaurante.com.br';
  const linkPortalCliente = `${baseUrl}?portal=cliente`;

  const mensagemWhatsApp = `🍽️ *${nomeRestaurante}* — Faça seu Pedido Delivery!\n\nConfira nosso cardápio completo, monte sua marmita na brasa e peça online com entrega rápida:\n👉 ${linkPortalCliente}\n\nAguardamos seu pedido!`;

  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(linkPortalCliente);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    }
  };

  const handleCompartilharWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      mensagemWhatsApp
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(
    linkPortalCliente
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full text-white shadow-2xl overflow-hidden flex flex-col animate-modal">
        {/* Topo */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-white">
                Link do Cardápio para Clientes
              </h2>
              <p className="text-xs text-slate-400">
                Compartilhe pelo WhatsApp ou redes sociais
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Caixa de Explicação */}
          <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3.5 flex gap-3 text-xs text-amber-200/90 leading-relaxed">
            <Smartphone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300 mb-0.5">
                Portal Exclusivo para Clientes
              </p>
              Ao abrir este link, o cliente acessa a tela de autoatendimento (estilo iFood), monta sua marmita ou pede porções. O pedido cai{' '}
              <strong className="text-white">imediatamente no seu Kanban de Delivery</strong> e na{' '}
              <strong className="text-white">Cozinha KDS</strong>!
            </div>
          </div>

          {/* Campo com Link Copiável */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Link Direto de Pedidos:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={linkPortalCliente}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-hidden selection:bg-amber-500/30"
              />
              <button
                type="button"
                onClick={handleCopiarLink}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                  copiado
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                }`}
              >
                {copiado ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Botões de Ação Rápida */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCompartilharWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-xs active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar no WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => setMostrarQr(!mostrarQr)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>{mostrarQr ? 'Ocultar QR Code' : 'Ver QR Code'}</span>
            </button>
          </div>

          {/* Seção QR Code */}
          {mostrarQr && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center space-y-2.5">
              <div className="text-xs text-slate-300 font-medium">
                QR Code para Balcão ou Panfletos
              </div>
              <div className="inline-block p-2.5 bg-white rounded-xl shadow-md">
                <img
                  src={qrCodeUrl}
                  alt="QR Code Cardápio"
                  className="w-36 h-36 mx-auto"
                />
              </div>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Aponte a câmera do celular para abrir o cardápio no navegador.
              </p>
            </div>
          )}

          {/* Visualizar como Cliente */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Testar experiência do cliente:
            </span>
            <div className="flex gap-2">
              <a
                href={linkPortalCliente}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
              >
                <span>Nova Aba</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {onVerComoCliente && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onVerComoCliente();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 text-xs font-semibold transition-colors border border-amber-500/30"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Ver Agora</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
