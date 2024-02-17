import { db, Table } from "./dbDynamo.config.js";

// Create or Update
const createLaboratoryInfoService = async (data = {}) => {
    const params = {
        TableName: Table,
        Item: data,
    };

    try {
        await db.put(params).promise();
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

// Read laboratoryInfo by IDs
const getLaboratoryInfoByIDsService = async (laboratoryID, branchCode) => {
    const params = {
        TableName: Table,
        Key: {
            laboratoryID: parseInt(laboratoryID),
            branchCode: parseInt(branchCode),
        },
    };
    try {
        const { Item = {} } = await db.get(params).promise();
        return { success: true, data: Item };
    } catch (error) {
        return { success: false, data: null };
    }
};

export { createLaboratoryInfoService, getLaboratoryInfoByIDsService };
