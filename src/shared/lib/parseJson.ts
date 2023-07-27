export const parseJson = (jsonString: string) => {
    try {
        return JSON.parse(jsonString);
    } catch (err) {
        alert('Не получилось обработать ответ на запрос');
    }
};
