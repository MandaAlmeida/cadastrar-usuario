export function calculateAge(date: string) {

    const birth = new Date(date);


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