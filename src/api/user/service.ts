/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './interface';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/primsa';
import { uploadMultipleFiles } from '../../middleware/uploadImage';

const getUser = async (user: JwtPayload): Promise<IUser | null> => {
    const { email } = user;
    const profile = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            Booking: true
        }
    });
    if (!profile) {
        throw new ApiError(httpCode.NOT_FOUND, 'User not found');
    }
    return profile;
};

const updateProfilePicture = async (req: any) => {
    const file = req.file;
    const { email } = req.user;
    try {
        const shopImage = [file];
        const imageUrl = await uploadMultipleFiles(shopImage);

        const data = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                profileImage: imageUrl[0]
            }
        });

        return data;
    } catch (error: any) {
        // console.log(error?.message);
        throw new ApiError(
            httpCode.INTERNAL_SERVER_ERROR,
            'Error uploading image'
        );
    }
};

const updateProfileData = async (req: any, data: any) => {
    const { email } = req.user;

    const newData = await prisma.user.update({
        where: {
            email: email
        },
        data: data
    });

    return newData;
};

const getAllUser = async (page: any = 1, pageSize: number = 6) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const result = await prisma.user.findMany({
        skip,
        take
    });
    const totalServices = await prisma.user.count({});

    const meta = {
        page: parseInt(page),
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };

    return {
        data: result,
        meta: meta
    };
};

const getAllAdmin = async (page: any = 1, pageSize: number = 6) => {
    const skip = (parseInt(page) - 1) * pageSize;
    const take = pageSize;
    const result = await prisma.user.findMany({
        where: {
            role: 'admin'
        },
        skip,
        take
    });
    const totalServices = await prisma.user.count({});

    const meta = {
        page: parseInt(page),
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };

    return {
        data: result,
        meta: meta
    };
};

const deleteUser = async (id: any) => {
    try {
        const result = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });

        return result;
    } catch (error) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid Id');
    }
};

const updateProfileByAdmin = async (id: string, data: any) => {
    try {
        const newData = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: data
        });
        return newData;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to update user data'
        );
    }
};

const updateRole = async (email: any, role: any) => {
    try {
        const result = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                role: role
            }
        });
        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'User Role Update Failed'
        );
    }
};

export const UserService = {
    getUser,
    updateProfileData,
    updateProfilePicture,
    getAllUser,
    deleteUser,
    updateProfileByAdmin,
    getAllAdmin,
    updateRole
};
