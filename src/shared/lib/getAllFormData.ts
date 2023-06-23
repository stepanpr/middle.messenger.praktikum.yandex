import { IRegisterFormData } from '../interfaces';

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
