import {BrowserRouter , Routes,Route} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Table from "./components/Table";
import Edit from "./components/Edit";
import Add from "./components/Add";

function App() {
 

  return (
    <BrowserRouter>
    <ToastContainer  autoClose={1000}/>
    <Routes>
      <Route path="/" element={ <Table/>} />
      <Route path="/add" element={ <Add/>} />
      <Route path="/update/:id" element={ <Edit/>} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
