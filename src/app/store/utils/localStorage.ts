import {EditorState} from "@/app/store/reducers/editorReducer.ts";

export const saveState = (state: EditorState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('editorPresentState', serializedState);
    } catch (err) {
        console.error("Ошибка при сохранении состояния в localStorage", err);
    }
};
export const loadState = (): EditorState | undefined => {
    try {
        const serializedState = localStorage.getItem('editorPresentState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as EditorState;
    } catch (err) {
        console.error("Ошибка при загрузке состояния из localStorage", err);
        return undefined;
    }
};
