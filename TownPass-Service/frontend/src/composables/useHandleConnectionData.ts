
export const useHandleConnectionData = (cb?: (event: { data: string }) => void) => {
    // @ts-ignore
    if (typeof flutterObject !== 'undefined' && flutterObject && cb) {
        alert('message received');
        // @ts-ignore
        flutterObject.addEventListener('message', cb);

        // @ts-ignore
        return () => flutterObject.removeEventListener('message', cb);
    }
};