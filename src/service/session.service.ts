import sessionModel from "../models/session.model";

export const createSession = async (userID: string, userAgent: string) => {
    const session = await sessionModel.create({userID, userAgent})
    session.toJSON();
};
