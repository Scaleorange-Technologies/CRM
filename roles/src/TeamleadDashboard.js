import React, { useState, useContext, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Bell, Moon, Layout, Menu } from 'lucide-react';
import ComplaintForm from './form';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { MyComplaintContext } from './mycomplaintcontext';
import { getMyComplaints } from './complaints/actions/mycomplaintactions';
import { FileText, Users, Edit, Plus } from 'lucide-react';
import EmployeeComplaintCards from './components/EmployeeComplaintsCards';
import { useComplaintContext } from './EmpComplaintContext';
import { fetchComplaints,forwardComplaint,reassignComplaint,updateComplaint } from './complaints/actions/EmpComplaintActions';
const data = [
  { date: '01 Feb', revenue: 6350, prevRevenue: 6550 },
  { date: '02 Feb', revenue: 6200, prevRevenue: 6750 },
  { date: '03 Feb', revenue: 6150, prevRevenue: 6450 },
  { date: '04 Feb', revenue: 6550, prevRevenue: 6350 },
  { date: '05 Feb', revenue: 6450, prevRevenue: 6550 },
  { date: '06 Feb', revenue: 6250, prevRevenue: 6650 },
  { date: '07 Feb', revenue: 6050, prevRevenue: 6600 },
];

const topProducts = [
  { name: 'K.Chandrika', change: 2.5, sales: 445467 },
  { name: 'M.Chandana', change: 12.5, sales: 256982 },
  { name: 'K.Puneeth', change: -1.35, sales: 201869 },
  { name: 'D.Srivallika', change: 12.5, sales: 103967 },
  { name: 'Md.Karishma', change: -2, sales: 98543 },
];

const Sidebar = ({ isDarkMode, onMenuClick ,setActiveSection}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { dispatch } = useContext(MyComplaintContext);

  const menuItems = [
    { icon: <FileText size={20} />, label: 'My Complaints', onClick: () => onMenuClick('myComplaints') },
    { icon: <Users size={20} />, label: 'Complaints To Solve',
     onClick:()=>setActiveSection('employeeComplaints')
  },
    {
      icon: <Plus size={20} />,
      label: 'Post a Complaint',
      onClick: () => setIsFormOpen(true),
    },
  ];

  return (
    <div className={`w-64 h-screen shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="p-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
        <span className="text-xl font-bold">CRM</span>
      </div>
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            className={`flex items-center space-x-2 px-6 py-3 hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      {isFormOpen && <ComplaintForm onClose={() => setIsFormOpen(false)} isDarkMode={isDarkMode} />}
    </div>
  );
};

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  const handleViewProfile = () => {
    navigate('/profile'); 
  };

  return (
    <header className={`shadow-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          className={`p-2 rounded-lg border w-64 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button onClick={toggleNotification} className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            {isNotificationOpen && (
              <div className={`absolute top-full right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray text-gray-900'} shadow-lg rounded-md p-2`}>
                <p className="text-center">No Notifications</p>
              </div>
            )}
          </div>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100">
            <Moon size={20} />
          </button>
          <div className="relative">
            <div
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
              onClick={toggleMenu}
            >
              <i className="fas fa-user text-gray-600 text-sm"></i>
            </div>
            {isMenuOpen && (
              <div className={`absolute top-full right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} shadow-lg rounded-md p-2`}>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100"
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
                <button
                  className="w-full text-left p-2 hover:bg-red-300 text-red"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const SalesChart = ({ data, isDarkMode }) => (
  <div className={`col-span-2 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
    <div className="flex justify-between items-baseline mb-4">
      <div>
        <h2 className="text-3xl font-bold">$45,385</h2>
        <p className="text-gray-500">Sales this week</p>
      </div>
      <div className="text-green-500 flex items-center">
        <ArrowUpRight size={20} />
        <span className="ml-1">12.5%</span>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke={isDarkMode ? '#ffffff' : '#000000'} />
        <YAxis stroke={isDarkMode ? '#ffffff' : '#000000'} />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        <Line type="monotone" dataKey="prevRevenue" stroke="#ffa07a" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const TopProducts = ({ products, isDarkMode }) => (
  <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
    <h2 className="text-xl font-semibold mb-4">Statistics this month</h2>
    <h3 className="text-lg font-semibold text-purple-600 mb-2">Top Users</h3>
    {products.map((product, index) => (
      <div key={index} className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-gray-500">Sales: ${product.sales}</p>
          </div>
        </div>
        <div className={`text-${product.change > 0 ? 'green' : 'red'}-500`}>
          {product.change > 0 ? (
            <>
              <ArrowUpRight size={20} />
              <span className="ml-1">{product.change}%</span>
            </>
          ) : (
            <>
              <ArrowDownRight size={20} />
              <span className="ml-1">{Math.abs(product.change)}%</span>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
);

const TeamleadDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const [expandedComplaintId, setExpandedComplaintId] = useState(null); // Add state for expanded complaint
  const { loading, dispatch, state } = useContext(MyComplaintContext);
  //const[activeView,setActiveView]=useState('sales')


 
  
  
  useEffect(() => {
    fetchComplaints(dispatch);
  }, [dispatch]);
  
 
  useEffect(() => {
    if (activeSection === 'myComplaints') {
      getMyComplaints(dispatch).then(() => {
        console.log("My complaints fetched successfully");
      }).catch(error => {
        console.error("Failed to fetch my complaints:", error);
      });
    }
  }, [dispatch, activeSection]);
  useEffect(() => {
    if (activeSection === "employeeComplaints") {
      fetchComplaints(dispatch).then(() => {
        console.log("Complaints fetched successfully");
      }).catch(error => {
        console.error("Failed to fetch complaints:", error);
      });
    }
  }, [dispatch, activeSection]);
  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const handleCardClick = (complaint_id) => {
    setExpandedComplaintId(expandedComplaintId === complaint_id ? null : complaint_id);
  };

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Sidebar isDarkMode={isDarkMode} onMenuClick={handleMenuClick} setActiveSection={setActiveSection} />
      <div className="flex-1">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}  />
       
        <div className="p-6">
        {activeSection=== 'employeeComplaints' && (
            <EmployeeComplaintCards complaints={state.complaints} dispatch={dispatch} />
          ) }
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-3 gap-6 mb-6">
              <SalesChart data={data} isDarkMode={isDarkMode} />
              <TopProducts products={topProducts} isDarkMode={isDarkMode} />
            </div>
          )}
         {
         activeSection === 'myComplaints' && (
  <div className={`flex flex-wrap gap-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
    {loading ? (
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading...</p>
    ) : (
      state.complaints.map((complaint) => (
        <div
          key={complaint.complaint_id}
          className={`w-72 p-4 ${isDarkMode ? 'bg-gray-800 text-white shadow-md' : 'bg-white text-gray-900 shadow-lg'} rounded-lg cursor-pointer flex flex-col`}
          onClick={() => handleCardClick(complaint.complaint_id)}
        >
          <h3 className="text-lg font-semibold truncate">{complaint.title}</h3>
          <p className="truncate"><b>Description:</b> {complaint.description}</p>
          <p><b>Status:</b> {complaint.status}</p>
          {expandedComplaintId === complaint.complaint_id && (
            <div className={`mt-4 p-2 border-t ${isDarkMode ? 'border-gray-700 text-sm' : 'border-gray-200 text-sm'}`}>
              <p><strong>Assigned to:</strong> {complaint.assigned_to}</p>
              <p><strong>Additional Text:</strong> {complaint.additional_text}</p>
              <p><strong>Media:</strong> {complaint.media}</p>
            </div>
          )}
          
        </div>
      ))
    )}

  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default TeamleadDashboard;
