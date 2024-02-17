import {createLaboratoryInfoService, getLaboratoryInfoByIDsService} from "../services/dbDynamo.service.js";

export const createLaboratoryInfo = async (req, res) => {
    const { success, data } = await createLaboratoryInfoService(req.body);
    if (success) {
        return res.status(201).json(data);
    }

    return res.status(500).json({ success: false, message: "Error creating a laboratoryInfo" });
}

export const getLaboratoryInfoByIDs = async (req, res) => {
    const { laboratoryID, branchCode } = req.query;
    const { success, data } = await getLaboratoryInfoByIDsService(
        laboratoryID,
        branchCode
    );
    if (success) {
        return res.status(200).json(data);
    } else {
        return res.status(500).json({ success: false, message: "Error" });
    }
}