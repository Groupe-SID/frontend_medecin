import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loguser from './User/pages/Loguser';
import Registeruser from './User/pages/Registeruser';
import Protected from './User/components/Protected';
import Accueil from './User/pages/Accueil';


function App() {
  const isSignedIn = localStorage.getItem("isSignedIn");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Login/>} /> */}
          <Route path="/" element={<Loguser />} />
          <Route path="register" element={<Registeruser />} />
          <Route 
            path="accueil" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Accueil />
              </Protected>
            } 
          />
         {/* <Route 
            path="question" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Question />
              </Protected>
            } 
          />
          <Route 
            path="demander" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Ask />
              </Protected>
            } 
          />
          <Route 
            path="utilisateurs" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Users />
              </Protected>
            } 
          />
           <Route 
            path="detailquestion/:id" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Detailquestion />
              </Protected>
            } 
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;