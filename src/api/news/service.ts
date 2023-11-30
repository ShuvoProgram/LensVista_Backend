/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../shared/primsa";
import ApiError from "../../error/ApiError";
import { httpCode } from "../../shared/httpCodes";
import { uploadMultipleFiles } from "../../middleware/uploadImage";

const createNews = async (req: any) => {
    const file = req.file;
    // console.log(file)
    const images = [file];
    const newsData = req.body;

    const {
        title,
        content,
        contentType,
    } = newsData;

    try {
        const imageUrl = await uploadMultipleFiles(images);
        const result = await prisma.news.create({
            data: {
               title,
               contentType,
               content,
               banner: imageUrl[0]
            }
           });
           return result;
    } catch (error) {
        console.log(error);
        throw new ApiError(
            httpCode.BAD_REQUEST,
            ' An Error was encountered while creating service'
        );
    }

   
  };

  const getAllNews = async (
    page: number = 1,
    pageSize: number = 6
) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const news = await prisma.news.findMany({
        skip,
        take
    });

    const totalNews = await prisma.news.count({});

    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalNews / pageSize)
    };

    return {
        data: news,
        meta: meta
    };
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
    getAllNews,
    getSingleNews,
    updateNews,
    deleteNews
};

