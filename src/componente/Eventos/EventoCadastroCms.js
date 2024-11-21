import { postCliente } from "../integração/funcao.js"
import styles from '../Css/footer.module.css'
import { useNavigate } from 'react-router-dom'


function EventoCadastro() {
    const navigate = useNavigate();
    async function meuEvento() {
        const nomeCampo = document.getElementById('nome').value
        const emailCampo = document.getElementById('email').value
        const senhaCampo = document.getElementById('senha').value
        const confirmarcaoCampo = document.getElementById('confirmacao').value
        const cpfCampo = document.getElementById('cnpj').value

        if (nomeCampo == '' || cpfCampo == '' || emailCampo == '' || senhaCampo == '' || confirmarcaoCampo == '') {
            alert('Preencha os campos corretamente!')
        } else {
            if (confirmarcaoCampo != senhaCampo) {
                alert('Senhas incompativeis')
            } else{
                let validarCadastro = '';

                    try {
                        const novoUsuario = {
                            nome_cliente: nomeCampo,
                            cnpj_cliente: cpfCampo,
                            email_cliente: emailCampo,
                            senha_cliente: senhaCampo,
                        }

                        let resultCadastro = await postCliente(novoUsuario)
                        validarCadastro = await resultCadastro

                        if (validarCadastro.status_code == 201) {
                            let id_cliente = resultCadastro.cliente.id_cliente
                            console.log(id_cliente);
                            alert('Cadastro concluído!')
                            navigate('/TelaInicial2', {state: {id_cliente: id_cliente}})

                        } else {
                            alert(validarCadastro.status_code)
                        }

                    } catch (error) {
                        alert('⚠︎ Erro')
                        console.log(error);
                    }

            }



            
        }

    }


    return (
        <div>
            <button className={styles.button} onClick={meuEvento} >Continuar</button>
        </div>
    )


}
export default EventoCadastro