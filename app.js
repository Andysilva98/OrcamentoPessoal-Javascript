class Despesas{
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (!this[i]) return false
        }
        return true
    }
}

class Bd{
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
        
    }
   
    gravar(despesa) {
        let id = parseInt(localStorage.getItem('id'))+1
        localStorage.setItem('id', id)
        localStorage.setItem(id, JSON.stringify(despesa))
    }

    recuperarRegistros() {
        let id = localStorage.getItem('id')
        let despesas = Array()
        
        for (let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null) continue
            despesas.push(despesa)
        }
        return despesas
    }
}

let bd = new Bd

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('modal_titulo_div').classList = 'text-success'
        document.getElementById('modal_titulo').innerText = 'Salvo'
        document.getElementById('modal_conteudo').innerText = 'Registro salvo com sucesso'
        document.getElementById('modal_btn').classList = 'btn-success'
        document.getElementById('modal_btn').style.cursor = 'pointer'

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('modal_titulo_div').classList = 'text-danger'
        document.getElementById('modal_titulo').innerText = 'Erro no Registro'
        document.getElementById('modal_conteudo').innerText = 'Registro não preenchido corretamente'
        document.getElementById('modal_btn').classList = 'btn-danger'
        document.getElementById('modal_btn').style.cursor = 'pointer'

    }

    

}

function carregaListaDespesas() {
    let listaDespesas = document.getElementById('listaDespesas')
    let despesas = Array()
    despesas = bd.recuperarRegistros()

    despesas.forEach(d => {
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerText = `${d.dia}/${d.mes}/${d.ano}`

        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerText = d.tipo
        linha.insertCell(2).innerText = d.descricao  
        linha.insertCell(3).innerText = d.valor
    })

}

