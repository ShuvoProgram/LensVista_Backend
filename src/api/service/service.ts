/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Service } from '@prisma/client';
import { prisma } from '../../shared/primsa';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { uploadMultipleFiles } from '../../middleware/uploadImage';

const getAllServices = async (
    page: number = 1,
    pageSize: number = 10,
    searchQuery?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number
) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: any = {
        AND: [
            searchQuery
                ? {
                      OR: [
                          {
                              title: {
                                  contains: searchQuery.toLowerCase()
                              }
                          },
                          {
                              description: {
                                  contains: searchQuery.toLowerCase()
                              }
                          },
                          {
                              category: {
                                  contains: searchQuery.toLowerCase()
                              }
                          }
                          // Add more fields to search as needed
                      ]
                  }
                : undefined,
            category
                ? { category: { contains: category } }
                : undefined,
            minPrice ? { price: { gte: minPrice } } : undefined,
            maxPrice ? { price: { lte: maxPrice } } : undefined
        ].filter(Boolean)
    };

    const services = await prisma.service.findMany({
        where,
        skip,
        take
    });

    const totalServices = await prisma.service.count({});

    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };

    return {
        data: services,
        meta: meta
    };
};

const getSingleService = async (id: number) => {
    const result = await prisma.service.findUnique({
        where: {
            id
        }
    });

    if (!result) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid id');
    }

    return result;
};

const getBestServices = async (
    page: number = 1,
    pageSize: number = 6
) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const services = await prisma.service.findMany({
        skip,
        take
    });

    const totalServices = await prisma.service.count({});

    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };

    return {
        data: services,
        meta: meta
    };
};

const deleteService = async (id: any) => {
    try {
        const services = await prisma.service.delete({
            where: {
                id: parseInt(id)
            }
        });
        return services;
    } catch (error) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid id');
    }
};

const updateService = async (id: number, data: any) => {
    try {
        const service = await prisma.service.update({
            where: {
                id: id
            },
            data: data
        });

        return service;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to update Service'
        );
    }
};

const createService = async (req: any) => {
    const file = req.file;
    // console.log(file)
    const images = [file];
    const serviceData = req.body;

    const {
        title,
        price,
        category,
        availability,
        rating,
        description
    } = serviceData;

    try {
        const imageUrl = await uploadMultipleFiles(images);
        const result = await prisma.service.create({
            data: {
                title,
                price: parseInt(price),
                availability: availability === 'true' ? true : false,
                category,
                description,
                rating,
                banner: imageUrl[0]
            }
        });
        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            ' An Error was encountered while creating service'
        );
    }
};

export const sService = {
    // createService,
    createService,
    getAllServices,
    getSingleService,
    getBestServices,
    deleteService,
    updateService
};
