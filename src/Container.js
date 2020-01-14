import App from './App';
import { connect } from "react-redux"

const mapStateToProps = (state) => {
    return {state}
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      type: dispatch.type,
      object: dispatch.object
    }
  }
  
const Container = connect(mapStateToProps, mapDispatchToProps)(App);
  
export default Container;