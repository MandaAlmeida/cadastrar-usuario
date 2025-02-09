export const formatDate = (dateString: string) => {
    const parts = dateString.split("/");
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    }
    return dateString;
};
