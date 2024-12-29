import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './NewPresentationModal.module.css'
import plusIcon from '@/assets/Plus.svg'
import {ChangeEvent, useRef} from "react";
import Ajv from "ajv";
import presentationSchema from "@/entities/presentation/presentationSchema.ts";
import {AppDispatch} from "@/app/store/store.ts";
import {addPresentation} from "@/app/store/actions.ts";
import {Presentation} from "@/shared/types/types.ts";

const ajv = new Ajv();
const validate = ajv.compile(presentationSchema);

const NewPresentationModal = () => {
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
        window.open(`/presentation/${newPresentation.id}`, '_blank');
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

export default NewPresentationModal;