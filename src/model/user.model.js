const _roles = require("../config/roles_list")
class Usuarios{
    constructor(id, nome, email, senha,agenda, roles){
        this.id = id;
        this.nome =nome;
        this.email = email;
        this.senha = senha,
        this.agenda = agenda;
        roles = _roles
    }
}

module.exports = Usuarios;