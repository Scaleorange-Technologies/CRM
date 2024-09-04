import React, { useState, useContext, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Bell, Moon, FileText, Plus } from 'lucide-react';
import { useComplaintContext } from './EmpComplaintContext';
import ComplaintForm from './form';
import { useNavigate } from 'react-router-dom';
import { MyComplaintContext } from './mycomplaintcontext';
import { getMyComplaints } from './complaints/actions/mycomplaintactions';
import EmployeeComplaintCards from './components/EmployeeComplaintsCards';
import { ComplaintContext } from './ComplaintContext';
import { submitComplaint } from './complaints/actions/ComplaintActions';
import { setComplaints } from './complaints/actions/EmpComplaintActions';
import { fetchComplaints } from './complaints/actions/EmpComplaintActions';
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

const Sidebar = ({ isDarkMode, onMenuClick }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { dispatch } = useContext(MyComplaintContext);

  const menuItems = [
    { icon: <FileText size={20} />, label: 'My Complaints', onClick: () => onMenuClick('myComplaints') },
    { icon: <Plus size={20} />, label: 'Post a Complaint', onClick: () => setIsFormOpen(true) },
    { icon: <FileText size={20} />, label: 'Reassigned Complaints', onClick: () => onMenuClick('reComplaints') }
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

const EmployeeDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { forwardComplaint, reassignComplaint, updateComplaint } = useComplaintContext();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedComplaintId, setExpandedComplaintId] = useState(null);
  const { loading, state, dispatch } = useContext(MyComplaintContext);


  useEffect(() => {
    fetchComplaints(dispatch);
  }, [dispatch]);
  

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    additional_text: '',
    media: []
  });

  // useEffect(()=>{
  //   getMyComplaints().then(setComplaints);
  // },[setComplaints]);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (expandedComplaintId) {
      try {
        await updateComplaint(dispatch, expandedComplaintId, formData);
        await forwardComplaint(dispatch, expandedComplaintId);

        // Update the local state to reflect the changes
        const updatedComplaints = state.complaints.map(complaint =>
          complaint.complaint_id === expandedComplaintId
            ? { ...complaint, ...formData }
            : complaint
        );
        dispatch({ type: 'SET_COMPLAINTS', payload: updatedComplaints });
        alert("complaint updated successfully")
       // submitComplaint(dispatch,formData)
        setExpandedComplaintId(null);


        // alert('Complaint updated successfully!');
      } catch (error) {
        console.error('Error updating complaint:', error);
        alert('Failed to update complaint. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (activeSection === 'myComplaints' || activeSection === 'reComplaints') {
      getMyComplaints(dispatch);
    }
  }, [dispatch, activeSection]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const handleCardClick = (complaint_id, e) => {
    e.stopPropagation();
    setExpandedComplaintId(expandedComplaintId === complaint_id ? null : complaint_id);
    const complaint = state.complaints.find(c => c.complaint_id === complaint_id);
    if (complaint) {
      setFormData({
        title: complaint.title,
        description: complaint.description,
        additional_text: complaint.additional_text || '',
        media: complaint.media || []
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };
  const handleCardClick2 = (complaint_id) => {
    setExpandedComplaintId(expandedComplaintId === complaint_id ? null : complaint_id);
  };
  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Sidebar isDarkMode={isDarkMode} onMenuClick={handleMenuClick} />
      <div className="flex-1">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="p-6">
          {/* ... (keep existing dashboard and other sections) */}

          {activeSection === 'myComplaints' && (
            <div className={`flex flex-wrap gap-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              {loading ? (
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading...</p>
              ) : (
                state.complaints.map((complaint) => (
                  <div
                    key={complaint.complaint_id}
                    className={`w-72 p-4 ${isDarkMode ? 'bg-gray-800 text-white shadow-md' : 'bg-white text-gray-900 shadow-lg'} rounded-lg cursor-pointer flex flex-col`}
                    onClick={() => handleCardClick2(complaint.complaint_id)}
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



          {activeSection === 'reComplaints' && (
            <div className={`flex flex-wrap gap-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              {loading ? (
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Loading...</p>
              ) : (
                state.complaints
                   .filter((complaint) => complaint.status === 'Reinvestigation to EMPLOYEE' || complaint.status === 'Reinvestigation to Employee'  )
                  //.filter(complaint => activeSection === 'reComplaints' ? complaint.status === 'Reinvestigation to Employee' : true)
                  .map((complaint) => (
                    <div
                      key={complaint.complaint_id}
                      className={`w-72 p-4 ${isDarkMode ? 'bg-gray-800 text-white shadow-md' : 'bg-white text-gray-900 shadow-lg'} rounded-lg cursor-pointer flex flex-col`}
                      onClick={(e) => handleCardClick(complaint.complaint_id, e)}
                    >
                      <h3 className="text-lg font-semibold truncate">{complaint.title}</h3>
                      <p className="truncate"><b>Description:</b> {complaint.description}</p>
                      <p><b>Status:</b> {complaint.status}</p>
                      {expandedComplaintId === complaint.complaint_id && (
                        <form onSubmit={handleFormSubmit} onClick={handleFormClick} className="mt-4 p-2 border-t bg-white text-gray-900 rounded-lg shadow-lg">
                          <h2 className="text-xl font-semibold mb-4">Update Complaint</h2>
                          <label className="block mb-2">
                            <span className="text-gray-700">Title</span>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleFormChange}
                              className="form-input mt-1 block w-full"
                              required
                            />
                          </label>
                          <label className="block mb-2">
                            <span className="text-gray-700">Description</span>
                            <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleFormChange}
                              className="form-textarea mt-1 block w-full"
                              required
                            />
                          </label>
                          <label className="block mb-2">
                            <span className="text-gray-700">Additional Text</span>
                            <textarea
                              name="additional_text"
                              value={formData.additional_text}
                              onChange={handleFormChange}
                              className="form-textarea mt-1 block w-full"
                            />
                          </label>
                          <div className="flex justify-end mt-4">
                            <button
                              type="submit"

                              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                              Save
                            </button>
                          </div>
                        </form>
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

export default EmployeeDashboard;
