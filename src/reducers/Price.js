export default (state = 4, action) => {
    switch (action.type) {
        case "UPDATE_PRICE":
            return action.payload;
        default:
            return state;
    }
};
