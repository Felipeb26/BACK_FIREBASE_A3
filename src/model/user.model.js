class Usuarios{
    constructor(id, nome, email, senha,agenda, role){
        this.id = id;
        this.nome =nome;
        this.email = email;
        this.agenda = agenda;
        this.senha = senha,
        this.role = role
    }
}

module.exports = Usuarios;