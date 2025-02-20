import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { MdNoteAdd } from "react-icons/md";
import CaseForm from "../components/Forms/CaseForm/AddCaseForm";

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCases = async (query = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/cases?search=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleSearch = () => {
    fetchCases(search);
  };

  const handleClear = () => {
    setSearch("");
    fetchCases("");
  };

  const columns = useMemo(
    () => [
      {
        header: "Case No.",
        accessorKey: "subjective_form_id",
      },
      {
        header: "Patient No.",
        accessorKey: "patient_number",
      },
      {
        header: "First Name",
        accessorKey: "patient_first_name",
      },
      {
        header: "Last Name",
        accessorKey: "patient_last_name",
      },
      {
        header: "Clinician",
        accessorKey: "clinician_name",
      },
      {
        header: "Clinical Instructor",
        accessorKey: "clinical_instructor_name",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
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
              <MdNoteAdd size={20} color="#4CAF50" />
            </button>

            {userRole !== "Clinician" && (
              <button
                onClick={() => handleDelete(row.original)}
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
    []
  );

  const table = useReactTable({
    data: cases,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddCase = () => {
    setIsModalOpen(true);
  };
  

  const handleEdit = (caseItem) => {
    console.log("Edit case:", caseItem);
  };

  const handleDelete = (caseItem) => {
    console.log("Delete case:", caseItem);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pages-body">
      <h1>Case Management</h1>
      <hr />
      <br />

      <div className="search-container">
        {/* 🆕 Add Case Button */}
        <h1>Search Cases</h1>
        <button
          onClick={handleAddCase}
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
          <HiUserAdd size={20} /> Add New Case
        </button>
      </div>
      <br />
      <br />

      <div className="search-container">
        <input
          type="text"
          placeholder="Patient No. or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {search && <button onClick={handleClear}>Clear</button>}
      </div>

      {loading ? (
        <p>Loading Cases...</p>
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
            <CaseForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesPage;
