import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import {AppDispatch, appState} from "../../store/store.ts";
import { addSlide, selectSlide} from "../../store/actions.ts";
import { Slide} from "../../store/types.ts";

const PresentationEditor = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const selectedPresentation = useSelector((state: appState) =>
        state.presentations.find(p => p.id === Number(id))
    );
    const selectedSlideId = useSelector((state: appState) => state.selectedSlideId);

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
                            style={{
                                backgroundColor: slide.backgroundColor,
                                border: slide.id === selectedSlideId ? '2px solid blue' : 'none'
                            }}>
                            <h4>Слайд ID: {slide.id}</h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PresentationEditor;
