import React from 'react';
import { Menu, Search, Bell, MessageSquare, User, Phone, Mail, MapPin } from 'lucide-react';

const ContactCard = ({ name, email, phone, location }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span>{email}</span>
            </div>
            <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span>{phone}</span>
            </div>
            <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{location}</span>
            </div>
        </div>
    );
};

const Crm = ({ children }) => {
    const contacts = [
        { name: "John Doe", email: "john@example.com", phone: "(123) 456-7890", location: "New York, NY" },
        { name: "Jane Smith", email: "jane@example.com", phone: "(098) 765-4321", location: "Los Angeles, CA" },
        { name: "Bob Johnson", email: "bob@example.com", phone: "(111) 222-3333", location: "Chicago, IL" },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-teal-600 text-white p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                <nav>
                    <ul className="space-y-2">
                        {['Contacts', 'Form Builder', 'Page Builder', 'Workflows', 'Activity Logs', 'Templates', 'Messages', 'APIs', 'Insights', 'Global Settings'].map((item) => (
                            <li key={item} className="py-2 px-4 hover:bg-teal-700 rounded cursor-pointer">
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <Menu className="h-6 w-6 text-gray-500 mr-4" />
                            <h2 className="text-xl font-semibold text-gray-800">CRM Contact Details</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Search className="h-6 w-6 text-gray-500" />
                            <Bell className="h-6 w-6 text-gray-500" />
                            <MessageSquare className="h-6 w-6 text-gray-500" />
                            <User className="h-6 w-6 text-gray-500" />
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {contacts.map((contact, index) => (
                            <ContactCard key={index} {...contact} />
                        ))}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Crm;