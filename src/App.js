import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loguser from './User/pages/Loguser';
import Registeruser from './User/pages/Registeruser';
import Protected from './User/components/Protected';
import ProtectedAdmin from './Admin/components/ProtectedAdmin';
import Accueil from './User/pages/Accueil';
import Patients from './User/pages/Patients';
import Logadmin from './Admin/pages/Logadmin';
import Doctors from './User/pages/Doctors';
import Visits from './User/pages/Visits';
import Dashboard from './Admin/pages/Dashboard';
import Users from './Admin/pages/Users';
import Activity from './Admin/pages/Activity';
import TableMedecin from './Admin/pages/TableMedecin';
import TablePatient from './Admin/pages/TablePatient';
import TableTraitement from './Admin/pages/TableTraitement';


function App() {
  const isSignedIn = localStorage.getItem("isSignedIn");
  const isSignedAdmin = localStorage.getItem("isSignedAdmin")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Login/>} /> */}
          <Route path="/" element={<Loguser />} />
          <Route path="register" element={<Registeruser />} />
          <Route path="admin" element={<Logadmin />} />
          <Route 
              path="admin/dashboard" 
              element={
                <ProtectedAdmin isSignedAdmin={isSignedAdmin}>
                  <Dashboard />
                </ProtectedAdmin>
              } 
          />
          <Route 
              path="admin/users" 
              element={
                <ProtectedAdmin isSignedAdmin={isSignedAdmin}>
                  <Users />
                </ProtectedAdmin>
              } 

            />
            <Route 
              path="admin/activity" 
              element={
                <ProtectedAdmin isSignedAdmin={isSignedAdmin}>
                  <Activity />
                </ProtectedAdmin>
              } 
            />

          <Route 
              path="admin/medecins" 
              element={
                <ProtectedAdmin isSignedAdmin={isSignedAdmin}>
                  <TableMedecin />
                </ProtectedAdmin>
              } 
          />

          <Route 
              path="admin/patients" 
              element={
                <ProtectedAdmin isSignedAdmin={isSignedAdmin}>
                  <TablePatient />
                </ProtectedAdmin>
              } 
          />

          <Route 
              path="admin/traitements" 
              element={
                <ProtectedAdmin isSignedAdmin={isSignedAdmin}>
                  <TableTraitement />
                </ProtectedAdmin>
              } 
          />


          <Route 
            path="accueil" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Accueil />
              </Protected>
            } 
          />
          <Route 
            path="patients" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Patients />
              </Protected>
            } 
          />
          <Route 
            path="doctors" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Doctors />
              </Protected>
            } 
          />
          <Route 
            path="visits" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Visits />
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