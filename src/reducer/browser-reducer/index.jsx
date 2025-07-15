export const browserReducer = (state, {type, payload}) =>{
     switch(type){
        case "NAME":
            return {
                ...state,
                name: payload
            }
        case "TIME":
            return{
                ...state,
                time: payload
            }
        case "MESSAGE":
            return{
                ...state,
                message: payload < 12 ? "Good Morning" : payload >= 12 && payload <= 17 ? "Good Afternoon" : "Good Evening"
            }    

        case "TASK":
            return{
                ...state,
                task: payload
            }    
        
        case "CLEAR":
            return{
                ...state,
                task: null
            }

        default:
            return state;
     }
}