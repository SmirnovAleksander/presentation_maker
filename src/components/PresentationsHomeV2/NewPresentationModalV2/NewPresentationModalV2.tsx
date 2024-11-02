import {addPresentation} from "../../../store/actions.ts";
import {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './NewPresentationModalV2.module.css'
import plusIcon from '../../../assets/Plus.svg'
import {ChangeEvent, useRef} from "react";
import Ajv from "ajv";
import presentationSchema from "../../../store/presentationSchema.ts";
import {Presentation} from "../../../store/types.ts";

const ajv = new Ajv();
const validate = ajv.compile(presentationSchema);

const NewPresentationModalV2 = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const createNewPresentation  = () => {
        const newPresentation = {
            id: Date.now(),
            title: '',
            slides: [],
        };
        dispatch(addPresentation(newPresentation));
        navigate(`/presentation/${newPresentation.id}`);
    };
    const generateUniqueId = () => {
        return Math.floor(Date.now() + Math.random() * 1000);
    };
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = e.target?.result;
                    if (json) {
                        const loadedPresentation = JSON.parse(json as string) as Presentation;

                        const isValid = validate(loadedPresentation);
                        if (isValid) {
                            console.log("Загруженная презентация:", loadedPresentation);
                            const updatedPresentation: Presentation = {
                                ...loadedPresentation,
                                id: generateUniqueId(), // Генерируем новый ID для презентации
                                slides: loadedPresentation.slides.map(slide => ({
                                    ...slide,
                                    id: generateUniqueId(), // Генерируем новый ID для каждого слайда
                                    elements: slide.elements.map(element => ({
                                        ...element,
                                        id: generateUniqueId(), // Генерируем новый ID для каждого элемента
                                    })),
                                })),
                            };
                            console.log("Обновленная презентация:", updatedPresentation);
                            dispatch(addPresentation(updatedPresentation));
                            navigate(`/presentation/${updatedPresentation.id}`);
                        } else {
                            console.error("Ошибка валидации:", validate.errors);
                            alert("Неверный формат данных JSON файла. Проверьте структуру и повторите попытку.");
                        }
                    }
                } catch (error) {
                    console.error("Ошибка загрузки файла:", error);
                    alert("Произошла ошибка при загрузке файла. Проверьте содержимое и формат JSON.");
                }
            };
            reader.readAsText(file);
        }
    };
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    return (
        <div className={styles.createPresentationSection}>
            <p className={styles.presentationTitle}>Создать презентацию</p>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '10px'}}>
                <div className={styles.presentationCard} onClick={createNewPresentation}>
                    <img src={plusIcon} alt="+" width={50} height={50}/>
                    <p className={styles.cardTitle}>Пустая презентация</p>
                </div>
                <div className={styles.presentationCard} onClick={triggerFileInput}>
                    <img src={plusIcon} alt="+" width={50} height={50}/>
                    <p className={styles.cardTitle}>Загрузить из JSON</p>
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                accept="application/json"
                onChange={handleFileUpload}
            />
        </div>
    );
};

export default NewPresentationModalV2;