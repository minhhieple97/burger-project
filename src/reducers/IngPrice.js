export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_PRICE_INGREDIENTS":
            return action.payload;
        default:
            return state;
    }
};