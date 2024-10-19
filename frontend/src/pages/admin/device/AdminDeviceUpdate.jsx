import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDrawer from "../components/AdminDrawer";
import { updateSmartDeviceRequest } from "../../../api/smartDeviceApi"; // Update the path accordingly
import { ToastContainer, toast } from "react-toastify";

const AdminDeviceUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(location.state.device.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the device status
      await updateSmartDeviceRequest(status, location.state.device._id);
      toast.success("Device status updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Navigate back to the device management page after a short delay
      setTimeout(() => {
        navigate("/admin/devices");
      }, 2000);
    } catch (error) {
      console.error("Error updating device status:", error.message);
      toast.error("Failed to update device status.");
    }
  };

  return (
    <AdminDrawer>
      <div className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Update Device Status
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  value={
                    location.state.device.userId?.username || "No user assigned"
                  }
                  readOnly
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Area</label>
                <input
                  type="text"
                  value={location.state.device.area?.name || "No area assigned"}
                  readOnly
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Distributed">Distributed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="py-3 px-8 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 focus:ring-4 focus:ring-green-400"
              >
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </AdminDrawer>
  );
};

export default AdminDeviceUpdate;
