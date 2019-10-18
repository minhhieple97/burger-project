export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_ORDERS":
            return action.payload;
        default:
            return state;
    }
};
