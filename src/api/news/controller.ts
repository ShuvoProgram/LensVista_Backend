/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { newsService } from "./service";
import sendResponse from "../../shared/sendResponse";

const createNews = catchAsync(
    async (req: Request, res: Response) => {
        const result = await newsService.createNews(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'News created successfully',
            data: result
        });
    }
);

const getAllNews = catchAsync(async (req: any, res: Response) => {
    const { page }: any = req.query;
    const result = await newsService.getAllNews(
        parseInt(page)
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'News fetched successfully',
        data: result?.data,
        meta: result?.meta
    });
});

const getSingleNews = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await newsService.getSingleNews(parseInt(id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'News retrieve successfully',
            data: result
        });
    }
);

const updateNews = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;
        const result = await newsService.updateNews(
            parseInt(id),
            updatedData
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'News updated successfully',
            data: result
        });
    }
);

const deleteNews = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await newsService.deleteNews(parseInt(id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'News Deleted',
            data: result
        });
    }
);

export const newsController = {
    createNews,
    getAllNews,
    getSingleNews,
    updateNews,
    deleteNews
}