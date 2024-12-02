import React from 'react'
import '../styles/Rodape.css'

function Rodape() {
    return (
        <div>
            <div class="telaFinal">
                <br />
                <div class="espaçoCorFim"></div>
                <br />
                <div className="textFinalUmDois">
                    <div class="textFinal">
                        <h3 class="corbotão" onclick="sobre()">sobre nós</h3>
                        <br />
                        <h3 class="corbotão" onclick="serviços()">serviços</h3>
                        <br />
                        <h3 class="corbotão" onclick="logo()">logomarca</h3>
                        <br />
                        <h3 class="corbotão" onclick="fale()">fale conosco</h3>
                    </div>
                    <div class="textFinalDois">
                        <h3 onclick="sobre()">
                            A InkluaTicked busca abrir caminhos e facilitar o acesso  ao mercado de interativo de entretenimento para <br />
                            milhares de pessoas com deficiência. Nossa plataforma funciona como uma corrente colaborativa compostade <br />
                            elos sociais e profissionais que garantem oportunidades para organizações e pessoas Em toda SC. <br />
                        </h3>
                    </div>
                </div>
                <br />
                <div class="espaçoCorFim"></div>
                <br />
                <div class="final">
                    <img class="imgFim" src="./img/inkluaTicket.png" />
                    <div class="corTextFinal">
                        <h4>MEDIAÇÃO DE ENTRETENIMENTO LTDA - CNPJ:  0.000.000/0000-00 - Rod vicent walter bernardes , 8907 - Florianópolis, SC </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rodape
