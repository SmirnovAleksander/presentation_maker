import PresentationEditor from "./pages/PresentationEditor/PresentationEditor.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PresentationList from "./pages/PresentationList/PresentationList.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {appState} from "./store/store.ts";

const App = () => {
    const state = useSelector((state: appState) => state);
    useEffect(() => {
        console.log('Общий стейт:', state);
    }, [state]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<PresentationList />} />
                <Route path="/presentation/:id" element={<PresentationEditor />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;