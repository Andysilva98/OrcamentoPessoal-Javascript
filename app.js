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
        //bd.gravar(despesa)
        console.log('true')
    } else {
        console.log('false')
    }

}