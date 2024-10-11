import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppDispatch, appState} from "../../store/store.ts";
import {addPresentation} from "../../store/actions.ts";

const PresentationList = () => {
    const dispatch: AppDispatch = useDispatch();
    const presentations = useSelector((state: appState) => state.presentations);
    const navigate = useNavigate();

    const createNewPresentation  = () => {
        const newPresentation = {
            id: Date.now(), // Генерация ID
            title: 'Новая презентация',
            slides: [],
        };
        dispatch(addPresentation(newPresentation));
        // const checkNewStatePresentation = () => {
        //     const updatedPresentations = presentations.find(p => p.id === newPresentation.id);
        //     if (updatedPresentations) {
        //         navigate(`/presentation/${newPresentation.id}`);
        //     } else {
        //         setTimeout(checkNewStatePresentation, 100);
        //     }
        // }
        // checkNewStatePresentation();
        navigate(`/presentation/${newPresentation.id}`);
    };

    return (
        <div className="presentation-list">
            <button onClick={createNewPresentation}>Создать новую презентацию</button>
            {presentations.map(presentation => (
                <div key={presentation.id}>
                    <h3>{presentation.title}</h3>
                    <button onClick={() => navigate(`/presentation/${presentation.id}`)}>Редактировать</button>
                </div>
            ))}
        </div>
    );
};

export default PresentationList;
