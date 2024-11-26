import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserList from './components/UserList';
import RoleList from './components/RoleList';
import WarningDialog from './components/WarningDialog';
import ErrorBoundary from './components/ErrorBoundary';
import { mockRoles } from './data/mock';

function App() {
  const [warning, setWarning] = React.useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });

  const handleError = (error: Error, errorInfo: string) => {
    if (errorInfo.includes('Warning: Encountered two children with the same key')) {
      setWarning({
        isOpen: true,
        message: 'Duplicate React keys detected. This may cause rendering issues. Please check component implementations.',
      });
    }
  };

  return (
    <ErrorBoundary onError={handleError}>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          
          <div className="flex-1">
            <Header />
            
            <main className="p-6">
              <Routes>
                <Route path="/" element={<UserList roles={mockRoles} />} />
                <Route path="/roles" element={<RoleList />} />
                <Route path="/settings" element={
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
                    <p className="mt-4 text-gray-600">Settings page content will go here.</p>
                  </div>
                } />
                <Route path="/reports" element={
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
                    <p className="mt-4 text-gray-600">Reports page content will go here.</p>
                  </div>
                } />
              </Routes>
            </main>
          </div>
        </div>

        <WarningDialog
          isOpen={warning.isOpen}
          onClose={() => setWarning({ isOpen: false, message: '' })}
          message={warning.message}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;