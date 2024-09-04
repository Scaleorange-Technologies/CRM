import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Bell, Moon, Settings, LayoutDashboard, Layout, Database, File, Lock, PlayCircle, Github, FileText, Menu } from 'lucide-react';
import Register from './components/Register';
import Login from './components/Login';
import { Route,Router,Routes,BrowserRouter } from 'react-router-dom';
import { AddProvider } from './registerContext';
import { ComplainttProvider } from './EmpComplaintContext';
import { AuthProvider } from './loginContext';
import { ComplaintProvider } from './ComplaintContext';
import Profile from './components/Profile';
import { MyComplaintProvider } from './mycomplaintcontext';
import TeamleadDashboard from './TeamleadDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import InternDashboard from './InternDashboard';
import TeamManagerDashboard from './TeamManagerDashboard';
import HrDashboard from './HrDashboard';
import CeoDashboard from './CeoDashboard';


function App() {
  return (
    <>
    <AuthProvider>
    <AddProvider>
    <ComplaintProvider>
      <MyComplaintProvider>
        <ComplainttProvider>
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path='/interndashboard' element={<InternDashboard/>}/>
        <Route path='/teamleaddashboard'element={<TeamleadDashboard/>}/>
        <Route path="/teammanagerdashboard" element={<TeamManagerDashboard/>}/>
        <Route path="/hrdashboard" element={<HrDashboard/>}/>
        <Route path="/ceodashboard" element={<CeoDashboard/>}/>
      </Routes>
    </BrowserRouter>
    </ComplainttProvider>
    </MyComplaintProvider>
    </ComplaintProvider>
    </AddProvider>
    </AuthProvider>
  </>
   );
}

export default App;