const cepInput = document.getElementById('cep');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const ruaInput = document.getElementById('rua');
const numeroInput = document.getElementById('numero');
const bairroInput = document.getElementById('bairro');
const msg = document.getElementById('mensagem');

function mostrarMensagem(texto, tipo = 'info') {
  const cor = {
    erro: 'text-red-600',
    sucesso: 'text-green-600',
    info: 'text-blue-600'
  }[tipo];

  msg.className = `text-center text-sm mt-4 font-semibold ${cor}`;
  msg.textContent = texto;

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "";
  }, 4000);
}

async function buscarCEP() {
  const cep = cepInput.value.replace(/\D/g, '');

  if (!/^[0-9]{8}$/.test(cep)) {
    mostrarMensagem("⚠️ Informe um CEP válido com 8 dígitos numéricos.", 'erro');
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      mostrarMensagem("❌ Nenhum endereço encontrado para esse CEP.", 'erro');
      return;
    }

    cidadeInput.value = data.localidade || "";
    ufInput.value = data.uf || "";
    mostrarMensagem("✅ CEP localizado com sucesso. Preencha os demais campos.", 'sucesso');

  } catch (err) {
    mostrarMensagem("🚨 Erro ao tentar buscar o CEP. Verifique sua conexão.", 'erro');
  }
}

function limparCampos() {
  cepInput.value = "";
  ruaInput.value = "";
  numeroInput.value = "";
  bairroInput.value = "";
  cidadeInput.value = "";
  ufInput.value = "";
  mostrarMensagem("🧹 Todos os campos foram limpos.", 'info');
}

function salvarDados() {
  const dados = {
    cep: cepInput.value,
    rua: ruaInput.value,
    numero: numeroInput.value,
    bairro: bairroInput.value,
    cidade: cidadeInput.value,
    uf: ufInput.value
  };

  console.log("Dados salvos:", dados);
  mostrarMensagem("✅ Os dados foram salvos com sucesso.", 'sucesso');
}

document.getElementById('buscar').addEventListener('click', buscarCEP);
document.getElementById('limpar').addEventListener('click', limparCampos);
document.getElementById('salvar').addEventListener('click', salvarDados);