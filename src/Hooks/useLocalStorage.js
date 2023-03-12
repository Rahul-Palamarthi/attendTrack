function getLocalData(key) {
    const val = localStorage.getItem(key);
    if (val === null) {
        setLocalData(key, []);
        return [];
    }

    return JSON.parse(val);
}

function setLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export { getLocalData, setLocalData };
