/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/primsa';

const createFaq = async (data: any) => {
    try {
        const result = await prisma.fAQ.create({
            data: data
        });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to create faq'
        );
    }
};

const getFaq = async () => {
    const result = await prisma.fAQ.findMany({});
    return result;
};

const deleteFaq = async (id: any) => {
    try {
        const result = await prisma.fAQ.delete({
            where: {
                id: id
            }
        });
        return result;
    } catch (error) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Failed to delete');
    }
};
const updateFaq = async (id: any, data: any) => {
    try {
        const result = await prisma.fAQ.update({
            where: {
                id: id
            },
            data: data
        });
        return result;
    } catch (error) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Failed to update');
    }
};

export const FaqService = {
    createFaq,
    getFaq,
    deleteFaq,
    updateFaq
};
