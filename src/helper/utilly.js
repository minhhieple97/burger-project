export const updateObject = (oldObject, updatePropperties) => {
    return {
        ...oldObject,
        ...updatePropperties
    }
}