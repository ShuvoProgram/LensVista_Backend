/* eslint-disable @typescript-eslint/no-explicit-any */
import { News } from "@prisma/client";
import { prisma } from "../../shared/primsa";
import ApiError from "../../error/ApiError";
import { httpCode } from "../../shared/httpCodes";

const createNews = async (data: News): Promise<News> => {
    const result = await prisma.news.create({
     data: data
    });
    return result;
  };

  const getSingleNews = async (id: number) => {
    const result = await prisma.news.findUnique({
        where: {
            id
        }
    });

    if (!result) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid id');
    }

    return result;
};

const updateNews = async (id: number, data: any) => {
    try {
        const result = await prisma.news.update({
            where: {
                id: id
            },
            data: data
        });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to update Service'
        );
    }
};

const deleteNews = async (id: any) => {
    try {
        const result = await prisma.news.delete({
            where: {
                id: parseInt(id)
            }
        });
        return result;
    } catch (error) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid id');
    }
};

  export const newsService = {
    createNews,
    getSingleNews,
    updateNews,
    deleteNews
};
