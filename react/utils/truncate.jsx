export const truncateText = (s) => {
    if (s?.length < 50) return s;
    else {
        const text = s?.substring(0, 50) + "...";
        return text;
    }
};
