export const rules = {
    login: {
        message:
            'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, \
			без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
        regExp: /^[a-zA-Z0-9-_]{3,20}$(?<=.*?[a-zA-Z].*?)/,
    },
    old_password: {
        message: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        regExp: /^(?=.*?[A-Z]+)(?=.*?[0-9]+).{8,40}$/,
    },
    password: {
        message: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        regExp: /^(?=.*?[A-Z]+)(?=.*?[0-9]+).{8,40}$/,
    },
    password_repeat: {
        message: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        regExp: /^(?=.*?[A-Z]+)(?=.*?[0-9]+).{8,40}$/,
    },
    email: {
        message:
            'латиница, может включать цифры и спецсимволы вроде дефиса, \
			обязательно должна быть «собака» (@) и точка после неё, \
			но перед точкой обязательно должны быть буквы.',
        regExp: /^[a-z0-9-]+@[a-z0-9-]+.[a-z]{2,6}$/,
    },

    phone: {
        message: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.',
        regExp: /^([0-9]+).{10,15}$/,
    },

    first_name: {
        message:
            'латиница или кириллица, первая буква должна быть заглавной, \
			без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        regExp: /^[A-Z-А-Я]+[A-Za-zА-Яа-я-]+$/,
    },
    second_name: {
        message:
            'латиница или кириллица, первая буква должна быть заглавной, \
			без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        regExp: /^[A-Z-А-Я]+[A-Za-zА-Яа-я-]+$/,
    },
    display_name: {
        message:
            'латиница или кириллица без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        regExp: /^[A-Za-zА-Яа-я-]+$/,
    },
    message: { message: 'не должно быть пустым.' },
};

/** Отправка формы. */
const getAllFormData = (event: Event) => {
    event.preventDefault();
    const result: Record<string, any> = {};
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
    inputs.forEach((input) => (result[input.name] = input.value || input.defaultValue));
    console.log(result);
};

/** Проверка инпутов. */
export const checkInput = (event: Event, rules: Record<string, any>) => {
    if (!event.target) return;
    const target = event.target as HTMLInputElement;
    const element = document.querySelector(`span[name=${target.name}]`);
    if (target.defaultValue && target.value === '') {
        target.value = target.defaultValue;
    }
    if (!rules.regExp.test(target.value)) {
        if (element) {
            element.textContent = rules.message;
        }
        return target.focus();
    }
    return element ? (element.textContent = '') : null;
};

/** Проверка формы при отправке (submit). */
export const checkSubmitForm = (event: Event, message?: string) => {
    event.preventDefault();
    const inputsWithValue = Array.from(document.getElementsByTagName('input'))
        .filter((element) => !element.hidden)
        .every((element) => element.value !== '');
    const withoutErrors = Array.from(document.querySelectorAll('input + span')).every(
        (element) => element.textContent === ''
    );
    inputsWithValue && withoutErrors
        ? getAllFormData(event)
        : alert(message || 'Корректно заполните все поля');
};

/** Очистка ошибок. */
export const clearError = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const elementWithError = document.querySelector(`span[name=${target.name}]`);
    if (elementWithError && target.value === '') {
        elementWithError.textContent = '';
    }
};
