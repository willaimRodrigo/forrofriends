import "./style.scss";

export const Tutorials = () => {


    return (
        <section className="tutorial-section">
            <h3>Baixar atalho</h3>
            <p>Na barra do navegador, clique nos 3 pontihos. Logo abrirá um menu lateral, desça até a opção
                 <span>Adicionar a tela inicial</span> e clique, ele fará o download de um ícone no seu celular, após, só clicar 
                 no atalho e você terá acesso ao app de forma muito mais fácil!</p>

            <h3>Bem vindo ao Tutorial do ForróFriends <span>botões</span></h3>
            <p>Ao clicar na playlist que deseja, abrirá a página com a música atual, controles de play,
                 pause, volume, pular e reiniciar a músicas. Logo abaixo, escrito <span>Músicas</span>, está armazanado 
                 todas as músicas do albúm selecionado, basta clicar em cima que abrirá todas as músicas, podendo escolher
                 qualquer música sem precisar passar uma por uma!</p>
            <p>Um pouco mais abaixo, temos dois botões, um padrão, que é igual em todoas as playlists, o <span>
                Agradeceu, Trocou</span> ao clicar nele, abrimos a função de treino livre. Como funciona?
                Essa função tem um espaço para digitar o tempo em segundos que você quer treinar, ao iniciar, 
                    irá tocar esse tempo e ao final irá tocar a mensagem Agradeceu, beijou e trocou, e irá reiniciar
                    o tempo, isso irá repetir até que o tempo seja encerrado. Há botão de resetar, reiniciando o tempo 
                    pré programado.
            </p>
            <p>Temos o botão <span>Simular Exame</span> esse botão irá variar de acordo com a playlist/roda selecioanda,
            vamos ver cada um!</p>
            <h6>Da Branca até a Azul Intermediária, o que faz?: </h6>
            <p>Ao iniciar o Timer, ele inicia um temporizador de aproximadamente 1:30 segundos, inicia a música e  ao final desse tempo,
                ele diminui o volume e para a música</p>
            <h6>Azul avançada e Preta:</h6>
            <p>Antes de inciar o timer, selecione uma música lenta e pause, agora inicie clique no botão <span>
                Iniciar Timer</span> ele iniciará a música lenta com um tempo de aproximadamente 1:23 segundos, 
                ao final desse tempo, ele irá diminuir o volume da música e pausar, após 5 segundos, ele irá iniciar 
                uma música rápida, após 1:15, ele irá tocar o alarme <span>Agradeceu, beijou e Trocou</span> e seguir
                por mais 1:15 até finalizar a música, realmente simulando um exame da roda
            </p>
            <h6>Pré Exame:</h6>
            <p>Ao clicar na playlist <span>Pré Inzame</span> Temos 4 categorias, clique em 1 delas. Vá ao botão 
            <span>Simular Pré Exame</span> e clique, ele abrirá duas caixas de valores, a primeira você digita o número
            de examinadores e na segunda você digita quando tempo vai dançar com cada examinador, tempo em segundos, 
            após clique em <span>Iniciar Timer</span>. Em seguida irá iniciar a primekra música, pode ser 
            interessante deixar o modo <span>Aleatório</span> ligado, irá tocar a música pelo tempo programado, tocará
            o alerta Agradeceu, beijou e Trocou, e continuará a música até que tenha tocado as vezes referente ao 
            número de examinadores, quando isso acontecer, a música pausará. Após isso, selecione o proximo ritmo, repita
            o processo do <span>Iniciar Timer</span> até passar por todas as categorias.</p>
        </section>
    )
}