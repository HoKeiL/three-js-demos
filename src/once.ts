
/** Return a proxy for the given function, which, 
 * when called any number of times, will only ever 
 * call the original function maximum once. */
export function once(originalFunction: () => void): () => void {
    let hasNeverRun = true;
    function proxyFunction() {
        if (hasNeverRun) {
            originalFunction();
            hasNeverRun = false;
        }
    }
    return proxyFunction;
}