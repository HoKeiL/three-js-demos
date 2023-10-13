export function getExpectedElement(id: string): HTMLElement {
    const elem = document.getElementById(id);
    if (!elem) {
        throw new Error("Missing expected element with id: " + id);
    }
    return elem;
}
