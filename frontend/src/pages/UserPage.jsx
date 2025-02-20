import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MdLockReset, MdLock } from "react-icons/md";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import AddUserForm from "../components/Forms/UserForm/AddUserForm";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchUsers = async (query = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/users?search=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(search);
  }, [search]);

  const handleSearch = () => {
    fetchUsers(search);
  };

  const handleClear = () => {
    setSearch("");
    fetchUsers("");
  };

  const columns = useMemo(
    () => [
      {
        header: "Student Number",
        accessorKey: "student_number",
      },
      {
        header: "First Name",
        accessorKey: "first_name",
      },
      {
        header: "Last Name",
        accessorKey: "last_name",
      },
      {
        header: "Role",
        accessorKey: "role",
      },
      {
        header: "Account Status",
        accessorKey: "status",
      },

      {
        header: "Actions",
        cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => handleReset(row.original)}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              <MdLockReset size={25} color="#4CAF50" />
            </button>

            <button
              onClick={() => handleReactivateUser(row.original)}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              <FaUnlockAlt size={20} color="#4CAF50" />
            </button>

            <button
              onClick={() => handleDeactivateUser(row.original)}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              <FaLock size={20} color="#F44336" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleReset = async (user) => {
    if (
      !window.confirm(
        `Reset password for ${user.first_name} ${user.last_name}?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Ensure authentication
      const response = await axios.post(
        "http://localhost:5000/api/users/reset-password", // Ensure it's POST
        { student_number: user.student_number },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error resetting password:", error);

      if (error.response) {
        alert(error.response.data.message || "Failed to reset password.");
      } else if (error.request) {
        alert("No response from server. Check if the backend is running.");
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };

  const handleDeactivateUser = async (user) => {
    if (
      !window.confirm(
        `Are you sure you want to deactivate ${user.first_name} ${user.last_name}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.student_number}/deactivate`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("Deactivate Response:", data); // Debugging

      if (response.ok) {
        alert(data.message); // ✅ Show success alert only once
        fetchUsers(); // ✅ Correct function to refresh user list
      } else {
        throw new Error(data.message || "Failed to deactivate user.");
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
      alert(error.message); // ✅ Show actual error message
    }
  };

  const handleReactivateUser = async (user) => {
    if (
      !window.confirm(
        `Are you sure you want to reactivate ${user.first_name} ${user.last_name}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/reactivate/${user.student_number}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("Reactivate Response:", data); // Debugging

      if (response.ok) {
        alert(data.message); // ✅ Show success alert only once
        fetchUsers(); // ✅ Refresh user list
      } else {
        throw new Error(data.message || "Failed to reactivate user.");
      }
    } catch (error) {
      console.error("Error reactivating user:", error);
      alert(error.message); // ✅ Show actual error message
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchUsers(); // Refresh user list after closing modal
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchPatients(search, page);
    }
  };

  return (
    <div className="pages-body">
      <h1>User Lists</h1>
      <hr />
      <br />
      <br />
      <br />

      <div className="search-container">
        {/* 🆕 Add User Button */}
        <h1>Search Users</h1>
        <button
          onClick={handleAddUser}
          style={{
            color: "white",
            border: "none",
            padding: "10px 12px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            height: "45px", // Adjust the height here
            borderRadius: "5px",
          }}
        >
          <HiUserAdd size={20} /> Add New User
        </button>
      </div>

      <br />
      <br />

      <div className="search-container">
        <input
          type="text"
          placeholder="Student Number or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {search && <button onClick={handleClear}>Clear</button>}
      </div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddUserForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserPage;
