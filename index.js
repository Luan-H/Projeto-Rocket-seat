let participantes = [
  {
    nome: 'Luan',
    email: 'luan@gmail.com',
    dataInscricao: new Date(2024, 2, 0o1, 19, 20),
    dataChekIn: null
  },
  {
    nome: 'Julio',
    email: 'julio@gmail.com',
    dataInscricao: new Date(2024, 3, 0o1, 19, 20),
    dataChekIn: new Date(2024, 2, 25, 22, 0o0)
  },
  {
    nome: 'João',
    email: 'joao@gmail.com',
    dataInscricao: new Date(2024, 3, 0o2, 10, 30),
    dataChekIn: new Date(2024, 2, 26, 12, 15)
  },
  {
    nome: 'Maria',
    email: 'maria@gmail.com',
    dataInscricao: new Date(2024, 3, 0o2, 11, 45),
    dataChekIn: new Date(2024, 2, 26, 10, 20)
  },
  {
    nome: 'Pedro',
    email: 'pedro@gmail.com',
    dataInscricao: new Date(2024, 3, 0o3, 14, 10),
    dataChekIn: null
  },
  {
    nome: 'Ana',
    email: 'ana@gmail.com',
    dataInscricao: new Date(2024, 3, 0o3, 16, 20),
    dataChekIn: new Date(2024, 2, 27, 15, 45)
  },
  {
    nome: 'Carlos',
    email: 'carlos@gmail.com',
    dataInscricao: new Date(2024, 3, 0o4, 18, 55),
    dataChekIn: new Date(2024, 2, 28, 19, 10)
  },
  {
    nome: 'Mariana',
    email: 'mariana@gmail.com',
    dataInscricao: new Date(2024, 3, 0o4, 20, 15),
    dataChekIn: new Date(2024, 2, 28, 18, 30)
  },
  {
    nome: 'Lucas',
    email: 'lucas@gmail.com',
    dataInscricao: new Date(2024, 3, 0o5, 22, 30),
    dataChekIn: null
  },
  {
    nome: 'Juliana',
    email: 'juliana@gmail.com',
    dataInscricao: new Date(2024, 3, 0o5, 23, 45),
    dataChekIn: null
  }
];

const criarNovoParticipante = (participante) => {

  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataChekIn = dayjs(Date.now()).to(participante.dataChekIn)

  if(participante.dataChekIn == null){
    dataChekIn = `
      <button
       data-email='${participante.email}'
        onclick='fazerCheckIn(event)'
      >
        Confirmar check-in
      </button>
      `
  }

  return `
  <tr>
   <td>
     <strong>${participante.nome}</strong>
     <br>
      <small>${participante.email}</small>
   </td>
   <td>${dataInscricao}</td>
   <td>${dataChekIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ''
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataChekIn: null
  }

  const participanteExiste = participante.find(
    (p) =>  p.email == participante.email
  )

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const fazerCheckIn = (event) => {

const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in ?'

  if(confirm(mensagemConfirmacao) == false){
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
    )

  participante.dataChekIn = new Date()

  atualizarLista(participantes)
}