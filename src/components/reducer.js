 const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ERROR":
      return {
        ...state,
        isError: true,
      };
    case "NEWSDATA":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case "NEWSRESULT":
      return {
        ...state,
        isLoading: false,
        totalResults: action.payload,
      };
    default:
      return state;
  }
}; 
export default reducer;
