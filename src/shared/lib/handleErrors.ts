import { IRegisterFormData } from '../../shared/interfaces';

export const rules: { [key: string]: { message: string; regExp?: RegExp } } = {
    login: {
        message:
            'от 3 до 20 символов, латиница, может содержать цифры,' +
            'но не состоять из них, без пробелов,' +
            'без спецсимволов (допустимы дефис и нижнее подчёркивание).',
        regExp: /^[a-zA-Z0-9-_]{3,20}$(?<=.*?[a-zA-Z].*?)/,
    },
    first_name: {
        message:
            'латиница или кириллица, первая буква должна быть заглавной,' +
            'без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        regExp: /^[A-Z-А-Я]+[A-Za-zА-Яа-я-]+$/,
    },
    second_name: {
        message:
            'латиница или кириллица, первая буква должна быть заглавной,' +
            'без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        regExp: /^[A-Z-А-Я]+[A-Za-zА-Яа-я-]+$/,
    },
    email: {
        message:
            'латиница, может включать цифры и спецсимволы вроде дефиса,' +
            'обязательно должна быть «собака» (@) и точка после неё,' +
            'но перед точкой обязательно должны быть буквы.',
        regExp: /^[a-z0-9-]+@[a-z0-9-]+.[a-z]{2,6}$/,
    },
    oldPassword: {
        message: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        regExp: /^(?=.*?[A-Z]+)(?=.*?[0-9]+).{8,40}$/,
    },
    password: {
        message: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        regExp: /^(?=.*?[A-Z]+)(?=.*?[0-9]+).{8,40}$/,
    },
    password_confirm: {
        message: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        regExp: /^(?=.*?[A-Z]+)(?=.*?[0-9]+).{8,40}$/,
    },
    phone: {
        message: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.',
        regExp: /^([0-9]+).{10,15}$/,
    },
    message: { message: 'не должно быть пустым.' },
    display_name: {
        message:
            'латиница или кириллица, первая буква должна быть заглавной,' +
            'без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        regExp: /^[A-Z-А-Я]+[A-Za-zА-Яа-я-]+$/,
    },
};

/** Отправка формы. */
export const getAllFormData = (event: Event, formName: string): IRegisterFormData => {
    event.preventDefault();
    const result: IRegisterFormData = {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        phone: '',
    };
    const form = document.forms.namedItem(formName);
    const inputs: NodeListOf<HTMLInputElement> = form?.querySelectorAll(
        'input'
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach(
        (input) =>
            (result[input.name as keyof IRegisterFormData] =
                input.value || input.defaultValue)
    );
    return result;
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
export const checkSubmitForm = (
    event: Event,
    formName: string
): IRegisterFormData | undefined => {
    event.preventDefault();
    const form = document.forms.namedItem(formName);
    if (!form) {
        alert('Форма для заполнения не найдена.');
        return;
    }
    const isAllInputBlank = Array.from(form.getElementsByTagName('input'))
        .filter((item) => !item.hidden)
        .every((element: HTMLInputElement) => element.value !== '');
    const isAllErrorExist = Array.from(form.querySelectorAll('input + span')).every(
        (item: HTMLSpanElement) => item.textContent === ''
    );
    const isAllProfileErrorExist = Array.from(form.querySelectorAll('label + span')).every(
        (item: HTMLSpanElement) => item.textContent === ''
    );
    if (isAllErrorExist && isAllInputBlank && isAllProfileErrorExist) {
        return getAllFormData(event, formName);
    }
    alert('Корректно заполните все поля');
    return;
};

/** Очистка ошибок. */
export const clearError = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const elementWithError = document.querySelector(`span[name=${target.name}]`);
    if (elementWithError && target.value === '') {
        elementWithError.textContent = '';
    }
};
