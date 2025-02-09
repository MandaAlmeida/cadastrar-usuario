export function calcularIdade(dataNascimento: string) {

    const nascimento = new Date(dataNascimento);


    const hoje = new Date();


    let idade = hoje.getFullYear() - nascimento.getFullYear();


    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }

    return idade;
}