import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./CSS/style.css";
import axios from "axios"
import NumberFormat from "react-number-format"
import { checkPropTypes } from "prop-types";

export default Usuarios => {

    //setando os usuários
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get(`https://www.mocky.io/v2/5d531c4f2e0000620081ddce`)
        .then(res => {
            const pessoa = res.data;
            setUsuarios(pessoa);
        })
    },[])

    //lista dos cartões
    let cards = [
        // cartão válido
        {
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
        },
        // cartão inválido
        {
          card_number: '4111111111111234',
          cvv: 123,
          expiry_date: '01/20',
        },
    ];

    //modal
    const [pagamentoOpen, setPagamentoOpen] = useState('none');
    const [listTransp, setListTransp] = useState('flex');
    const [payName, setPayName] = useState('');
    const [abrirResultado, setAbrirResultado] = useState('none');
    const [valorDinheiro, setValorDinheiro] = useState('');
    const [campoNecessario, setCampoNecessario] = useState('none');
    const [valorCartao, setValorCartao] = useState('1');
    const [naoConcluido, setNaoConcluido] = useState('');
    

     // Função para detectar modificação e resgatar valor no selection
     function handleChange(event){
        setValorCartao(event.target.value);
    }


    // Abrir o modal de pagameto
    function modalPagOpen (name) {
        setPagamentoOpen("flex")
        setListTransp("none")
        setPayName(name)
    }

    // Função para filtrar o valor do dinheiro
    function inputChange(e){
        setValorDinheiro(e.target.value);
        setCampoNecessario("none");
    }

    //Abrir o modal do recibo de pagamento
    function modalAbrirResultado () {
        if (valorDinheiro === '') {
            setCampoNecessario('flex');
        } else {
            if (valorDinheiro === "1") {
                setNaoConcluido("");
            } else {
                setNaoConcluido("não");
            }
            setPagamentoOpen('none');
            setAbrirResultado('flex');
            setValorDinheiro('');
            setCampoNecessario('none');
        }
    }

    function modalAbrirResultado () {
        if (valorDinheiro === '1'){
            setCampoNecessario('flex')
        }
    }

    //fechar modal
    function modalFecharResultado () {
        setAbrirResultado('none');
        setListTransp('flex');
    }

    //fechar modal no botão X
    function modalFecharX () {
        setPagamentoOpen('none');
        setListTransp('flex');
    }

    return (
        <>
            {/* lista de usuários */}
            {usuarios.map((item) =>
                <div className='usuarios' style={{display:listTransp}}>
                    <div className='img-usuario'>
                        <img src={item.img} alt='Imagem usuario'/>
                    </div>
                    <div className='identifica-usuario'>
                        <div>
                            Nome: {item.name}
                        </div>
                        <div>
                            ID: {item.id} - Username: {item.username}
                        </div>
                    </div>
                    <div className='botaoPagar'>
                        <button onClick={() => {modalPagOpen(item.name)}}>Pagar</button>
                    </div>
                </div>
            )}
            {/* modal de pagamento */}
            <div className='modalAberto' style={{display:pagamentoOpen}}>
                <div className='headerModal'>
                    <span>Pagamento para <b>{payName}</b></span>
                    <span className='fecharX' onClick={modalFecharX}>X</span>
                </div>
                <div className='inputValor'>
                    <NumberFormat thousandSeparator={true} value={valorDinheiro} onChange={inputChange} prefix={'R$ '} inputmode="numeric" placeholder="R$ 0,00"/>
                    <p style={{display: campoNecessario}}>Campo Obrigatório</p>
                </div>
                <select value={valorCartao} onChange={handleChange}>
                    <option value='1'>Cartão com final {cards[0].card_number.substr(-4)}</option>
                    <option value='2'>Cartão com final {cards[1].card_number.substr(-4)}</option>
                </select>
                <button onClick={() => {modalAbrirResultado ()}}>Pagar</button>
            </div>

            {/*Modal recibo do pagamento */}
            <div className='modalAberto' style={{display: abrirResultado}}>
                <span>Recibo de pagamento</span>
                <p>O pagamento <strong>{naoConcluido}</strong> foi concluído com sucesso</p>
                <button onClick={() => {modalFecharResultado()}}>Fechar</button>
            </div>  
        </>
    )
}
