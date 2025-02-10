export function calculateAge(date: string) {
    // Converte "DD/MM/YYYY" para "YYYY-MM-DD"
    const [day, month, year] = date.split("/");
    const birth = new Date(`${year}-${month}-${day}`);

    if (isNaN(birth.getTime())) {
        console.error("Data inválida:", date); // Ajuda a depurar erros
        return "Data inválida";
    }

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();

    const currentMonth = today.getMonth();
    const birthdayMonth = birth.getMonth();
    const currentDay = today.getDate();
    const birthday = birth.getDate();

    if (currentMonth < birthdayMonth || (currentMonth === birthdayMonth && currentDay < birthday)) {
        age--;
    }

    return age;
}
