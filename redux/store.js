import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";

//const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 });

const store = createStore(
    rootReducer, 
//	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
	
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;




// export default function configurestore(preloadedstate) {
  // const composeenhancers = composewithdevtools({ actioncreators });
  // const composeenhancers = composewithdevtools({ actioncreators, trace: true, tracelimit: 25 });
   // const store = createstore(reducer, preloadedstate, composeenhancers(
    // applymiddleware(invariant(), thunk)
  // ));

