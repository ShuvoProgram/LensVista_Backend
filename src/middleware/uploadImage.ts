import { v2 as cloudinary } from 'cloudinary';

// Assuming the structure of your file objects
type UploadedFile = {
    fieldname: string;
    path: string;
    // Add other properties if available in your file object
}

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || '',
    api_key: process.env.CLOUD_API_KEY || '',
    api_secret: process.env.CLOUD_API_SECRET || ''
});

async function uploadFileToCloudinary(file: UploadedFile, folder: string): Promise<string> {
    try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: folder
        });
        return uploadResult.secure_url || ''; // Change this if secure_url is not a string
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

async function uploadMultipleFiles(files: UploadedFile[]): Promise<string[]> {
    const uploadResults: string[] = [];

    try {
        for (const file of files) {
            let folder = '';

            if (file.fieldname === 'banner') {
                folder = 'LensVista/products';
            } else if (file.fieldname === 'profilePicture') {
                folder = 'LensVista/User-profile';
            }

            if (folder) {
                const uploadedUrl = await uploadFileToCloudinary(file, folder);
                if (uploadedUrl) {
                    uploadResults.push(uploadedUrl);
                }
            }
        }

        return uploadResults;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
}

export { UploadedFile, uploadMultipleFiles };
