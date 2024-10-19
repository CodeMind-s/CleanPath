import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDrawer from "../components/AdminDrawer";
import {
  deleteSmartDeviceRequest,
  getAllSmartDeviceRequests,
} from "../../../api/smartDeviceApi";
import AdminDeviceUpdate from "./AdminDeviceUpdate"; // Import the modal here
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllAreas } from "../../../api/areaApi";

const AdminDevice = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [areas, setAreas] = useState([]);

  const fetchAllSmartDevices = async () => {
    try {
      const res = await getAllSmartDeviceRequests();
      setDevices(res);
      setFilteredDevices(res);
    } catch (error) {
      console.error("Error fetching devices: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllSmartDevices();
  }, []);

  const handleEditClick = (device) => {
    setSelectedDevice(device);
    setOpenUpdateModal(true);
  };

  const handleUpdate = (deviceId, updatedStatus) => {
    setDevices((currentDevices) =>
      currentDevices.map((device) =>
        device._id === deviceId ? { ...device, status: updatedStatus } : device
      )
    );
  };

  const handleCloseModal = () => {
    setOpenUpdateModal(false);
    setSelectedDevice(null);
  };

  return (
    <AdminDrawer>
      <h1 className="m-5 text-2xl font-semibold text-green-900">
        Smart Device Management
      </h1>
      <div className="m-5 shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>{/* Table Headers */}</tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr key={device._id} className="bg-white border-b">
                  {/* Table Data */}
                  <td className="px-4 py-4 text-right">
                    <EditIcon
                      onClick={() => handleEditClick(device)}
                      className="cursor-pointer text-gray-400"
                    />
                  </td>
                  {/* More rows... */}
                </tr>
              ))
            ) : (
              <tr>
                <td className="w-full text-lg text-red-600 py-7 font-semibold text-center col-span-5">
                  No Device requests found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openUpdateModal && selectedDevice && (
        <AdminDeviceUpdate
          device={selectedDevice}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
      <ToastContainer />
    </AdminDrawer>
  );
};

export default AdminDevice;
