import {ElementActions} from "../actions.ts";
import editorReducer, {EditorState, initialPresentState} from "./editorReducer.ts";

export interface UndoableState {
    past: EditorState[];
    present: EditorState;
    future: EditorState[];
}

export const initialUndoableState: UndoableState = {
    past: [],
    present: initialPresentState,
    future: [],
}
export const undoableReducer = (state = initialUndoableState, action: ElementActions): UndoableState => {
    const { past, present, future } = state;
    switch (action.type) {
        case 'UNDO': {
            if (past.length === 0) return state;
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);

            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        }
        case 'REDO': {
            if (future.length === 0) return state;
            const next = future[0]
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        }
        default: {
            const newPresent = editorReducer(present, action)
            if (newPresent === present) {
                return state;
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: [],
            };
        }
    }
}