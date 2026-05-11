export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

export function isValidURL(url: string) {
    try {
        const parsed = new URL(url)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
        return false
    }
}