import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import {AppDispatch, appState} from "../../store/store.ts";
import {addSlide} from "../../store/actions.ts";
import {Slide} from "../../store/types.ts";

const PresentationEditor = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentation = useSelector((state: appState) =>
        state.presentations.find(p => p.id === Number(id))
    );

    const addNewSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            elements: [],
            backgroundColor: '#ffffff',
        };
        if (selectedPresentation) {
            dispatch(addSlide(selectedPresentation.id, newSlide));
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
                        <div key={slide.id} style={{ backgroundColor: slide.backgroundColor }}>
                            <h4>Слайд ID: {slide.id}</h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PresentationEditor;
