import React from 'react'
import { useEffect } from 'react';

const NomeDasTelasLeitor = ({message}) => {

    useEffect(() => {
        // Atualiza a mensagem dinamicamente ao mudar de tela
        document.getElementById('screen-reader-announcement').textContent = message;
      }, [message]);

  return (
    <div
    id="screen-reader-announcement"
    role="alert"
    aria-live="assertive"
    style={{
      position: 'absolute',
      left: '-9999px',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    }}
  >
    {/* Mensagem inicial vazia */}
  </div>
  )
}

export default NomeDasTelasLeitor
