import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Users from './Users';
import Resume from './resume';

function Click() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="product" element={<Users />} />
        <Route path="resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default Click;