import PresentationEditor from "../pages/PresentationEditor/PresentationEditor.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage.tsx";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {appState} from "./store/store.ts";
import PresentationsHome from "@/pages/PresentationsHome/PresentationsHome.tsx";
import FullscreenPresentationPreview
    from "@/features/presentationEditor/ui/FullscreenPresentationPreview/FullscreenPresentationPreview.tsx";

const App = () => {
    const state = useSelector((state: appState) => state);
    useEffect(() => {
        console.log('Общий стейт:', state);
    }, [state]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<PresentationsHome />} />
                <Route path="/presentation/:id" element={<PresentationEditor />}/>
                <Route path="/presentation/:id/slide_preview" element={<FullscreenPresentationPreview />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;