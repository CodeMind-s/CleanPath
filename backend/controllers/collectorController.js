import Collector from "../models/collectorModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @route   POST /api/collector
 * @desc    Create a new schedule request
 * @access  Private
 * @param   {Object} wmaId - The id of the wast management authority (required)
 * @param   {Object} collectorId - The id of the collector (required)
 * @param   {String} area - The area of the collection (required)
 * @param   {String} time - the time of schedule (required)
 * @param   {String} date - the date of schedule (required)
 * @returns {Object} - A JSON object containing the newly created schedule data
 */
const createCollector = asyncHandler(async (req, res) => {
  const { wmaId, truckNumber, collectorName, collectorNIC, contactNo} = req.body;

  if (!wmaId || !truckNumber || !collectorName || !collectorNIC || contactNo ) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  const collector = new Collector({
    wmaId,
    truckNumber,
    collectorName,
    collectorNIC,
    contactNo,
    statusOfCollector: 'Available'
  });

  const createdCollector = await collector.save();
  res.status(201).json(createdCollector);
});

/**
 * @route   GET /api/schedule
 * @desc    Get all schedule requests (Admin only)
 * @access  Private/Admin
 * @returns {Array} - A list of all schedules
 */
const getAllCollectors = asyncHandler(async (req, res) => {
  const collectors = await Collector.find({}).populate("wmaId", "wmaname")
  res.json(collectors);
});

/**
 * @route   GET /api/schedules/my-schedules
 * @desc    Get all schedules assingd to the truck
 * @access  Private (Authenticated Truck)
 * @returns {Array} - A list of schedules assingd to the truck
 */
const getCollectorsByWMA = asyncHandler(async (req, res) => {
  const collectors = await Collector.find({ wmaId: req.params.id })
  res.json(collectors);
});

/**
 * @route   GET /api/schedule/:id
 * @desc    Get a single schedule by ID
 * @access  Private
 * @returns {Object} - A single schedule
 */
const getCollectorById = asyncHandler(async (req, res) => {
  const collector = await Collector.findById(req.params.id)
  if (collector) {
    res.json(collector);
  } else {
    res.status(404);
    throw new Error("Collector not found");
  }
});

/**
 * @route   PUT /api/schedule/:id
 * @desc    Update a schedule status (Admin only)
 * @access  Private/Admin
 * @param   {Object} truckId - The id of the truck (required)
 * @param   {String} area - The area of the collection (required)
 * @param   {String} time - the time of schedule (required)
 * @param   {String} date - the date of schedule (required)
 * @returns {Object} - The updated garbage request
 */
const updateCollector = asyncHandler(async (req, res) => {
  const { wmaId, truckNumber, collectorName, collectorNIC, statusOfCollector, contactNo} = req.body;

  const collector = await Collector.findById(req.params.id);

  if (collector) {
    collector.wmaId = wmaId || collector.wmaId;
    collector.truckNumber = truckNumber || collector.truckNumber;
    collector.collectorName = collectorName || collector.collectorName;
    collector.collectorNIC = collectorNIC || collector.collectorNIC;
    collector.contactNo = contactNo || collector.contactNo;
    collector.statusOfCollector = statusOfCollector || collector.statusOfCollector;

    const updatedCollector = await collector.save();
    res.json(updatedCollector);
  } else {
    res.status(404);
    throw new Error("Collector not found");
  }
});

/**
 * @route   DELETE /api/schedule/:id
 * @desc    Delete a schedule (Admin only)
 * @access  Private/Admin
 * @returns {Object} - A JSON object confirming deletion
 */
const deleteCollector = asyncHandler(async (req, res) => {
  const collctor = await Collector.findByIdAndDelete(req.params.id);

  if (collctor) {
    res.json({ message: "Collector removed successfully!" });
  } else {
    res.status(404);
    throw new Error("Collector not found!");
  }
});

export {createCollector, getAllCollectors, getCollectorsByWMA, updateCollector, deleteCollector, getCollectorById};
