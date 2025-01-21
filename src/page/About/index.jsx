import "./style.scss";

export const About = () => {
    return (
        <>
        <section className="about-section">
            <div className="divabout">
            <h2>Objetivoo acadêmico do App</h2> 
            <p>Estudar, melhorar e explorar todo o conteúdo como forma de exercícios práticos.
                Construindo uma aplicação sozinho com o intuito de me desenvolver e ter experiêcias para área profissional! </p>
            </div>
            <div className="divabout">
                <h2>Objetivo do App</h2>
                <p>Solucionar e automatizar pequenos processos, visando assim facilitar o treino, 
                    sem que precise ficar alguém preocupado com o processo manual.</p>
                <p>O App simula um exame de dança, com comando pré estabelecidos, ao dar play na música e startar o botão, 
                    ele dará segmento as funções de tocar uma música lenta, diminuir o volume, pausar,
                     restaurar o volume e dar play a uma música rápida, que tocará por um determinado tempo, 
                     chamando um alerta sonoro para trocar o par, restaurar o som e seguir por mais um tempo até 
                     que cj=hegue ao final do tempo, onde irá diminuir o som, pausar e encerrar o temporizador
                </p>
                <p>Existe uma função apenas para treino livre, com um temporizador sonoro, onde o usuário pode configurar o tempo que quer 
                    cada dança e ao iniciar, o timer exibe um contador regressivo, que ao chegar a 0, chama o alerta sonoro 
                    para trocar o par, sem que interfira na música, apenas diminuindo a música para que o foco seja o áudio. 
                    O timer se repetirá até que seja pausado.
                </p>
            </div>
            </section>
        </>
    )
}