export function getDisplayType<T>(isEditable: boolean, id: T, set: Set<T>) {
    if (set.has(id))
        return 'is-active'
    if (isEditable) {
        return 'is-editable'
    }
    return 'is-inactive'
}
