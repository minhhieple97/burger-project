export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_INGREDIENTS":
            return action.payload;
        case "FETCH_INGREDIENTS":
            return {...state,...action.payload};
        default:
            return state;
    }
};
