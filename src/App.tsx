import PresentationEditor from "./pages/PresentationEditor/PresentationEditor.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import {useEffect} from "react";
import PresentationsHomeV2 from "./pages/PresentationsHomeV2/PresentationsHomeV2.tsx";
import FullscreenPresentationPreview
    from "./components/FullscreenPresentationPreview/FullscreenPresentationPreview.tsx";
import useEditorStore from "./store/store.ts";

const App = () => {
    const state = useEditorStore()
    const presentations = useEditorStore((state) => state.presentations);
    useEffect(() => {
        console.log('Общий стейт:', state);
        console.log('Общий presentations:', presentations);
    }, [state, presentations]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<PresentationsHomeV2 />} />
                <Route path="/presentation/:id" element={<PresentationEditor />}/>
                <Route path="/presentation/:id/slide_preview" element={<FullscreenPresentationPreview />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;