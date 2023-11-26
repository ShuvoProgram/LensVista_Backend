import { z } from 'zod';

const ServiceSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title required'
        }),
        banner: z.object(
            {},
            {
                required_error: 'image is required'
            }
        ),
        description: z.string({
            required_error: 'description required'
        }),
        category: z.string({
            required_error: 'category required'
        }),
        price: z.number({
            required_error: 'price required'
        }), // You can add more specific validation for price
        availability: z.boolean({
            required_error: 'availability required'
        }),
        rating: z.string().optional()
    })
});

export const ServiceValidation = { ServiceSchema };
