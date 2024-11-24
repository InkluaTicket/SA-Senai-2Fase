import React from "react";
import "../styles/Rodape.css";

const Rodape = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Sobre Nós</h4>
          <p>
            Somos uma empresa dedicada a criar soluções digitais inovadoras.
            Nosso objetivo é ajudar você a alcançar seus objetivos com
            tecnologia de ponta.
          </p>
        </div>

        <div className="footer-section">
          <h4>Contato</h4>
          <ul>
            <li>Email: contato@meusite.com</li>
            <li>Telefone: (11) 1234-5678</li>
            <li>Endereço: Rua Exemplo, 123 - São Paulo, SP</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Rodape;
