import Block from '../../lib/Block';
import modalTemplate from './modal.hbs';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './style.less';

interface ModalProps {
    title?: string;
    buttonTitle?: string;
    inputTitle?: string;
    selector?: string;
    isFile?: boolean;
    events?: Record<string, (args: any) => void>;
    submitCallback?: (...data: any) => void;
    reloadAvatar?: () => void;
}
class Modal extends Block {
    private _file: any;

    constructor(props: ModalProps) {
        const inputFile = new Input({
            label: 'Выбрать файл на компьютере',
            type: 'file',
            name: 'modal-input-file',
            fileInputLabel: '',
            events: {
                change: (e: Event) => {
                    this._onChangeInputHandler(e);
                },
            },
        });

        const submitButton = new Button({
            text: props.buttonTitle,
            type: 'submit',
        });

        const closeButton = new Button({
            text: 'X',
            type: 'button',
            events: {
                click: () => {
                    let modal = document.querySelector('.modal');
                    if (modal) (modal as any).style.display = 'none';
                    console.log(modal);
                },
            },
            styles: { button: 'closeButton' },
        });

        super('div', {
            ...props,
            inputFile,
            submitButton,
            closeButton,
            selector: 'form',
            events: {
                submit: (e: any) => {
                    e.preventDefault();
                    if (props.submitCallback) {
                        if (this.props.isFile) {
                            props.submitCallback(this._file);
                        }
                        if (props.reloadAvatar) {
                            props.reloadAvatar();
                        }
                    }
                },
            },
        });
    }

    private _onChangeInputHandler(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            const fileName = target.files[0].name;
            const formData = new FormData();
            formData.append('avatar', target.files[0]);
            this._file = formData;
            (this.children.inputFile as Block).setProps({
                fileInputLabel: fileName,
            });
        }
    }

    render() {
        return this.compile(modalTemplate, { ...this.props });
    }
}

export default Modal;
