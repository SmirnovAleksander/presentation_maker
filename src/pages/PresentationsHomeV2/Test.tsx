import { create } from 'zustand'

type State = {
    firstName: string
    lastName: string
}

type Action = {
    updateFirstName: (firstName: State['firstName']) => void
    updateLastName: (lastName: State['lastName']) => void
}

// Create your store, which includes both state and (optionally) actions
const usePersonStore = create<State & Action>((set) => ({
    firstName: '',
    lastName: '',
    updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
    updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))

// In consuming app
export function Test() {
    const firstName = usePersonStore((state) => state.firstName)
    const updateFirstName = usePersonStore((state) => state.updateFirstName)

    return (
        <main>
            <label>
                First name
                <input
                    // Update the "firstName" state
                    onChange={(e) => updateFirstName(e.currentTarget.value)}
                    value={firstName}
                />
            </label>

            <p>
                Hello, <strong>{firstName}!</strong>
            </p>
        </main>
    )
}
