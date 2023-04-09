export const drawingReducer = (state, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'FETCH_COMMENT':
            return { ...action.payload };
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            email: action.userEmail,
                        }
                    }
                ],
            }
        default:
            return state;
    }
};