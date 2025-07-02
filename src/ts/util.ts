export function toggleSetStatus<T>(item: T, set: Set<T>) {
    if (set.has(item))
        set.delete(item)
    else
        set.add(item)
}