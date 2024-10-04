import React, { useEffect, useState } from 'react';

const ManageEmployer = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch('http://localhost:5000/employers'); // Replace with your backend URL
        const data = await response.json();
        setEmployers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load employers');
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  // Handle Ban/Unban Toggle
  const handleToggleBanEmployer = async (employerId, isBanned) => {
    const action = isBanned ? 'unban' : 'ban';
    try {
      const response = await fetch(`http://localhost:5000/toggle-ban-employer/${employerId}`, {
        method: 'PUT',
      });
      const result = await response.json();
      if (result.success) {
        alert(`Employer ${action}ned successfully!`);
        setEmployers(employers.map(emp => 
          emp._id === employerId ? { ...emp, isBanned: !isBanned } : emp
        ));
      } else {
        alert(`Failed to ${action} employer.`);
      }
    } catch (error) {
      alert(`Error ${action}ning employer`);
    }
  };

  // Handle Delete
  const handleDeleteEmployer = async (employerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employer?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/delete-employer/${employerId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        alert('Employer deleted successfully!');
        setEmployers(employers.filter(emp => emp._id !== employerId));
      } else {
        alert('Failed to delete employer.');
      }
    } catch (error) {
      alert('Error deleting employer');
    }
  };

  if (loading) {
    return <p>Loading employers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Employer List</h1>
      {employers.length === 0 ? (
        <p>No employers found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Role</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((employer) => (
              <tr key={employer._id}>
                <td className="border border-gray-400 px-4 py-2">{employer.displayName}</td>
                <td className="border border-gray-400 px-4 py-2">{employer.email}</td>
                <td className="border border-gray-400 px-4 py-2">{employer.role}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className={`btn ${employer.isBanned ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-1 rounded`}
                    onClick={() => handleToggleBanEmployer(employer._id, employer.isBanned)}
                  >
                    {employer.isBanned ? 'Unban' : 'Ban'}
                  </button>
                  <button
                    className="btn bg-red-600 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleDeleteEmployer(employer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageEmployer;
