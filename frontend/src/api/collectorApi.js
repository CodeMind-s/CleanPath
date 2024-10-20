import API from "../helpers/apiHelper";

const createCollector = async (collector) => {
  try {
    const createdCollector = await new API().post("collector", collector);
    return createdCollector;
  } catch (error) {
    console.error("Error creating collector:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getAllCollectors = async () => {
  try {
    const collectors = await new API().get("collector", {});
    // console.log("garbagesINjs => ", garbages);
    return collectors;
  } catch (error) {
    console.error("Error fetching collectors:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getAllCollectorsInWma = async (id) => {
  try {
    const collectors = await new API().get(`collector/wma-collectors/${id}`, {});
    return collectors;
  } catch (error) {
    console.error("Error fetching collectors:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

// const getUserAllGarbages = async () => {
//   try {
//     const garbages = await new API().get("garbage/garbage-requests", {});
//     // console.log("garbagesINjs => ", garbages);
//     return garbages;
//   } catch (error) {
//     console.error("Error fetching garbages:", error.message);
//     throw error; // Rethrow the error for the component to handle
//   }
// };

const updateCollector = async (status, id) => {
  // Ensure the body only contains the status
  try {
    const updatedCollector = await new API().put(
      `collector/${id}`, // Make sure this URL matches your API endpoint for garbage requests
      status
    );
    // console.log(updatedGarbage);
    return updatedCollector;
  } catch (error) {
    console.error("Error updating collector:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const deleteCollector = async (id) => {
  try {
    const deletedCollector = await new API().delete(`collector/${id}`);
    // console.log("deletedGarbage => ", deletedGarbage);
    return deletedCollector.data;
  } catch (error) {
    console.error("Error deleting Collector:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export {
    createCollector,
    getAllCollectors,
    deleteCollector,
    getAllCollectorsInWma,
    updateCollector
};
