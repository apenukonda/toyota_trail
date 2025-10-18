import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Page, Department, Designation } from '../types';
// import { ToyotaLogo } from './icons';

const AuthPage: React.FC = () => {
  const { currentPage, setCurrentPage, currentUser, login, signup } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(currentPage === Page.LOGIN);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (currentUser && (currentPage === Page.LOGIN || currentPage === Page.SIGNUP)) {
      setCurrentPage(Page.DASHBOARD);
    }
  }, [currentUser, currentPage, setCurrentPage]);
  
  // Login state
  const [userId, setUserId] = useState('');
  const [department, setDepartment] = useState<Department | ''>('');
  const [passcode, setPasscode] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Signup state
  const [newUserId, setNewUserId] = useState('');
  const [newName, setNewName] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [newDepartment, setNewDepartment] = useState<Department | ''>('');
  const [newDesignation, setNewDesignation] = useState<Designation | ''>('');
  const [signupMessage, setSignupMessage] = useState('');


  const validateUserId = (id: string): string | null => {
    if (id.length < 6) {
        return "User ID must be at least 6 characters long.";
    }
    if (!/^[a-zA-Z0-9]+$/.test(id)) {
        return "User ID can only contain letters and numbers.";
    }
    return null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDepartmentError('');
    if (!passcode) {
      setError('Please enter your passcode.');
      setLoading(false);
      return;
    }
    const result = await login(userId, passcode, role);
    if (!result.success) {
      if (result.error === "Invalid User ID or you may need to register.") {
        setShowModal(true);
        setModalMessage("Employee ID not found in database. Click 'Create One' to register.");
      } else if (result.error === "The selected department does not match this User ID.") {
        setError("Invalid credentials");
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } else {
      setDepartmentError('');
    }
    setLoading(false);
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserId || !newName) {
        setError("User ID and Name cannot be empty.");
        return;
    }

    const userIdValidationError = validateUserId(newUserId);
    if (userIdValidationError) {
        setError(userIdValidationError);
        return;
    }

    if (!newDepartment) {
        setError("Please select a department.");
        return;
    }

  if (!newPasscode) {
    setError('Please provide a passcode (will be used as your password).');
    return;
  }

    if (!newDesignation) {
        setError("Please select a designation.");
        return;
    }

    setLoading(true);
    setError('');
    setSignupMessage('');

  const result = await signup({
    userId: newUserId,
    name: newName,
    department: newDepartment as Department,
    designation: newDesignation as Designation,
    passcode: newPasscode,
  });

    if (result.success) {
        setSignupMessage("Account created! Redirecting to dashboard...");
        // After signup, the user is automatically logged in.
        // The onAuthStateChange listener in AppContext will handle redirecting to the dashboard.
        // We no longer need to manually switch back to the login form.
    } else {
        setError(result.error || "Failed to create account. User ID might already be in use.");
    }
    setLoading(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSignupMessage('');
    setUserId('');
    setCurrentPage(isLogin ? Page.SIGNUP : Page.LOGIN);
  };

  const inputClass = "w-full px-4 py-3 bg-gray-200/50 border-2 border-transparent rounded-lg focus:outline-none focus:border-red-500 transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white animate-fade-in p-4">
      <div className="relative w-full max-w-md bg-white backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
            <img src="/company-logo.png" alt="company logo" className="h-12" />
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
            <div>
              <label className="text-sm font-medium text-gray-600">Employee ID</label>
              <input type="text" value={userId} onChange={e => setUserId(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Passcode</label>
              <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <div className="flex gap-4 mt-2">
                <label className="inline-flex items-center">
                  <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} />
                  <span className="ml-2">User</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                  <span className="ml-2">Admin</span>
                </label>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105 disabled:bg-red-400 disabled:scale-100">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account? <button type="button" onClick={toggleForm} className="font-semibold text-red-600 hover:underline">Create one →</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
             <div>
              <label className="text-sm font-medium text-gray-600">Employee ID</label>
              <input type="text" value={newUserId} onChange={e => setNewUserId(e.target.value)} className={inputClass} required />

            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Department</label>
              <select value={newDepartment} onChange={e => setNewDepartment(e.target.value as Department)} className={inputClass} required>
                  <option value="">Select Department</option>
                  {Object.values(Department).map(dep => <option key={dep} value={dep}>{dep}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Passcode</label>
              <input type="password" value={newPasscode} onChange={e => setNewPasscode(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Designation</label>
              <select value={newDesignation} onChange={e => setNewDesignation(e.target.value as Designation)} className={inputClass} required>
                  <option value="">Select Designation</option>
                  {Object.values(Designation).map(des => <option key={des} value={des}>{des}</option>)}
              </select>
            </div>

             {error && <p className="text-red-500 text-sm">{error}</p>}
             {signupMessage && <p className="text-green-500 text-sm">{signupMessage}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105 disabled:bg-red-400 disabled:scale-100">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account? <button type="button" onClick={toggleForm} className="font-semibold text-red-600 hover:underline">Login →</button>
            </p>
          </form>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <p className="text-gray-700 mb-4">{modalMessage}</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={() => {setShowModal(false); setIsLogin(false);}} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Create One</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;