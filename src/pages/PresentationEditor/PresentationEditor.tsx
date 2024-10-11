import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import {AppDispatch, appState} from "../../store/store.ts";
import {addElement, addSlide, selectSlide} from "../../store/actions.ts";
import {ImageElement, ShapeElement, Slide, TextElement} from "../../store/types.ts";

const PresentationEditor = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentation = useSelector((state: appState) =>
        state.presentations.find(p => p.id === Number(id))
    );
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);
    console.log(selectedSlideId)

    const selectedSlide = useSelector((state: appState) =>
        state.presentations
            .find(p => p.id === Number(id))
            ?.slides.find(s => s.id === state.selectedSlideId)
    );

    const addNewSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            elements: [],
            backgroundColor: '#ffffff',
        };
        if (selectedPresentation) {
            dispatch(addSlide(selectedPresentation.id, newSlide));
            dispatch(selectSlide(selectedPresentation.id, newSlide.id))
        }
    };

    const handleSlideClick = (slideId: number) => {
        if (selectedPresentation) {
            dispatch(selectSlide(selectedPresentation.id, slideId)); // Выбор слайда
        }
    };

    const addTextElement = () => {
        const newTextElement: TextElement = {
            id: Date.now(),
            type: 'text',
            content: 'Новый текст',
            fontSize: 16,
            fontFamily: 'Arial',
            color: '#d21',
            position: { x: 100, y: 100 },
            size: { width: 200, height: 50 },
            rotation: 0,
        };

        if (selectedSlideId && selectedPresentation) {
            dispatch(addElement(selectedPresentation.id, selectedSlideId, newTextElement));
        }
    };

    // Метод добавления изображения
    const addImageElement = () => {
        const imageUrl = 'https://avatars.dzeninfra.ru/get-zen_doc/1333513/pub_5fb9552f9d2ffe38eeb21401_5fb955f29d2ffe38eeb3305f/scale_1200';
        const newImageElement: ImageElement = {
            id: Date.now(),
            type: 'image',
            content: imageUrl,
            position: { x: 150, y: 150 },
            size: { width: 100, height: 100 },
            rotation: 0,
        };

        if (selectedSlideId && selectedPresentation) {
            dispatch(addElement(selectedPresentation.id, selectedSlideId, newImageElement));
        }
    };
    const addShapeElement = (type: 'rectangle' | 'circle' | 'line') => {
        const newShapeElement: ShapeElement = {
            id: Date.now(),
            type,
            position: { x: 200, y: 200 },
            size: { width: 100, height: 100 },
            color: '#ff0000',
            rotation: 0,
            lineWidth: 2,
            borderRadius: type === 'circle' ? 50 : 0, // Пример для круга
        };

        if (selectedSlideId && selectedPresentation) {
            dispatch(addElement(selectedPresentation.id, selectedSlideId, newShapeElement));
        }
    };


    return (
        <div className="presentation-editor">
            <div className="toolbar">
                <Link to={'/'}>
                    <button className="back-button">Вернуться к презентациям</button>
                </Link>
                <button onClick={addNewSlide}>Добавить слайд</button>
            </div>
            {selectedPresentation && (
                <div>
                    <h2>{selectedPresentation.title}</h2>
                    {selectedPresentation.slides.map(slide => (
                        <div
                            key={slide.id}
                            onClick={() => handleSlideClick(slide.id)}
                            style={{
                                backgroundColor: slide.backgroundColor,
                                border: slide.id === selectedSlideId ? '2px solid blue' : 'none', // Выделение выбранного слайда
                                cursor: 'pointer', // Изменение курсора
                                padding: '10px', // Добавление отступов для лучшего восприятия
                                marginBottom: '10px', // Пробел между слайдами
                            }}>
                            <h4>Слайд ID: {slide.id}</h4>
                        </div>
                    ))}
                    {selectedSlideId && (
                        <div className="element-buttons">
                            <h3>Добавить элемент</h3>
                            <button onClick={addTextElement}>Добавить текст</button>
                            <button onClick={addImageElement}>Добавить изображение</button>
                            <button onClick={() => addShapeElement('rectangle')}>Добавить прямоугольник</button>
                            <button onClick={() => addShapeElement('circle')}>Добавить круг</button>
                            <button onClick={() => addShapeElement('line')}>Добавить линию</button>
                        </div>
                    )}
                    <h3>Элементы слайда:</h3>
                    <ul>
                        {selectedSlide && selectedSlide.elements.map(element => (
                            <li key={element.id}>
                                {element.type === 'text' && `Текст: ${element.content}`}
                                {element.type === 'image' && `Изображение: ${element.content}`}
                                {element.type === 'rectangle' && `Фигура: Прямоугольник`}
                                {element.type === 'circle' && `Фигура: Круг`}
                                {element.type === 'line' && `Фигура: Линия`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PresentationEditor;
