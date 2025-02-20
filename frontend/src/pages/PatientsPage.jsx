import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import PatientModal from "../components/Modals/PatientModal";
import EditPatientModal from "../components/Modals/EditPatientModal";
import PatientForm from "../components/Forms/PatientForm/AddPatientForm";
import { FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";


const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewPatientModal, setViewPatientModal] = useState(false); // State for view modal
  const [editPatientModal, setEditPatientModal] = useState(false); // State for edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPatients = async (query = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/patients?search=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching Patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(search);
  }, [search]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log("User role:", role); // Check if the role is being fetched correctly
    setUserRole(role);
  }, []);

  const handleOpen = async (patient) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/patients/${patient.patient_number}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedPatient(response.data); // Store the patient data
      setViewPatientModal(true); // Open the view modal
      setEditPatientModal(false); // Ensure the edit modal is closed
      console.log("Selected Patient:", response.data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleCloseModal = () => {
    setViewPatientModal(false); // Close the view modal
    setEditPatientModal(false); // Close the edit modal
    setSelectedPatient(null); // Clear selected patient
    setIsModalOpen(false);
    fetchPatients();
  };

  const handleSearch = () => {
    fetchPatients(search);
  };

  const handleClear = () => {
    setSearch("");
    fetchPatients("");
  };

  const handleAddPatient = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setEditPatientModal(true); // Open the edit modal
    setViewPatientModal(false); // Ensure the view modal is closed
  };

  const handleDelete = async (patient_number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${patient_number}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        fetchPatients();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };
  
  const columns = useMemo(
    () => [
      {
        header: "Patient No.",
        accessorKey: "patient_number",
      },
      {
        header: "Profile",
        accessorKey: "profile_photo",
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
        header: "Middle Name",
        accessorKey: "middle_initial",
      },
      {
        header: "Gender",
        accessorKey: "sex_gender",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
      {
        header: "Contact Number",
        accessorKey: "mobile_no",
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
              onClick={() => handleOpen(row.original)}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              <FaFileAlt size={20} color="#1591EA" />
            </button>

            <button
              onClick={() => handleEdit(row.original)}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              <FaEdit size={20} color="#4CAF50" />
            </button>

            {userRole !== "Clinician" && (
              <button
                onClick={() => handleDelete(row.original.patient_number)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <FaTrash size={20} color="#F44336" />
              </button>
            )}
          </div>
        ),
      },
    ],
    [userRole]
  );

  const table = useReactTable({
    data: patients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleUpdateSuccess = () => {
    fetchPatients(); // Refresh the patient list
  };

  return (
    <div className="pages-body">
      <h1>Patients Lists</h1>
      <hr /> <br /> <br /> <br />
      
      <div className="search-container">
        <h1>Search Patients</h1>
        <button
         onClick={handleAddPatient}
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
          <HiUserAdd size={20} /> Add New Patient
        </button>
      </div><br /><br />
      <div className="search-container">
        <input
          type="text"
          placeholder="Patient Number or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {search && <button onClick={handleClear}>Clear</button>}
      </div>
      {loading ? (
        <p>Loading patients...</p>
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
      {/* Patient Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PatientForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
      {/* Patient Modal (View Mode) */}
      {viewPatientModal && (
        <PatientModal patient={selectedPatient} onClose={handleCloseModal} />
      )}
      {/* Edit Patient Modal (Edit Mode) */}
      {editPatientModal && (
        <EditPatientModal
          patient={selectedPatient}
          onClose={handleCloseModal}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default PatientsPage;
