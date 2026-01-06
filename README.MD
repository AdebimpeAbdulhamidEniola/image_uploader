# Image Upload API

A robust RESTful API for uploading and managing images with cloud storage integration. Built with Express.js, TypeScript, Prisma, and Cloudinary.

## Features

- **Cloud Storage Integration**: Seamlessly upload images to Cloudinary with automatic optimization
- **Database Persistence**: Store image metadata in PostgreSQL using Prisma ORM
- **File Validation**: Automatic validation for file types, sizes, and field names
- **Error Handling**: Comprehensive error handling for uploads, database operations, and validation
- **TypeScript Support**: Fully typed codebase for better development experience
- **RESTful Architecture**: Clean and intuitive API endpoints

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: Cloudinary
- **File Upload**: Multer with Cloudinary storage adapter

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account ([sign up here](https://cloudinary.com/))

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd image_upload_api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Cloudinary Configuration
CLOUD_NAME="your_cloud_name"
CLOUD_KEY="your_api_key"
CLOUD_SECRET="your_api_secret"

# Server
PORT=3000
```

4. Run database migrations:
```bash
npx prisma migrate deploy
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

### Upload Image

Upload a single image file to the server.

**Endpoint**: `POST /api/upload`

**Content-Type**: `multipart/form-data`

**Body Parameters**:
- `image` (file, required): Image file to upload

**Supported Formats**: JPG, JPEG, PNG, GIF, WebP

**Maximum File Size**: 2MB

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "image=@/path/to/your/image.jpg"
```

**Success Response** (201):
```json
{
  "status": "success",
  "message": "Image saved successfully",
  "data": {
    "id": 1,
    "imageURL": "https://res.cloudinary.com/...",
    "filename": "example.jpg",
    "publicId": "image_uploader/xyz123",
    "type": "image/jpeg",
    "createdat": "2024-01-06T10:30:00.000Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: No file uploaded, invalid file type, or file too large
- `409 Conflict`: File with the same name already exists

### Get Image by Public ID

Retrieve image metadata by its Cloudinary public ID.

**Endpoint**: `GET /api/download/:publicId`

**Path Parameters**:
- `publicId` (string, required): The Cloudinary public ID of the image

**Example Request**:
```bash
curl http://localhost:3000/api/download/image_uploader%2Fxyz123
```

**Success Response** (200):
```json
{
  "status": "success",
  "message": "Image found",
  "data": {
    "id": 1,
    "imageURL": "https://res.cloudinary.com/...",
    "filename": "example.jpg",
    "publicId": "image_uploader/xyz123",
    "type": "image/jpeg",
    "createdat": "2024-01-06T10:30:00.000Z"
  }
}
```

**Error Responses**:
- `404 Not Found`: Image not found with the specified public ID

## Project Structure

```
image_upload_api/
├── prisma/
│   ├── migrations/          # Database migration files
│   └── schema.prisma        # Prisma schema definition
├── src/
│   ├── config/              # Configuration files
│   │   ├── app.ts          # Express app setup
│   │   └── cloudinary.ts   # Cloudinary configuration
│   ├── controllers/         # Route controllers
│   │   └── imagesController.ts
│   ├── general/             # General utilities
│   │   ├── handleResponse.ts
│   │   └── notFoundHandler.ts
│   ├── lib/                 # External library setup
│   │   └── prisma.ts       # Prisma client instance
│   ├── middleware/          # Custom middleware
│   │   ├── errorHandler.ts
│   │   └── upload.ts       # Multer configuration
│   ├── model/               # Data access layer
│   │   └── ImageModel.ts
│   ├── routes/              # API routes
│   │   └── imagesRoutes.ts
│   ├── utils/               # Utility functions
│   │   ├── customError.ts
│   │   └── errorHandler.ts
│   └── index.ts             # Application entry point
├── .env                     # Environment variables (not in repo)
├── .gitignore
├── package.json
├── prisma.config.ts         # Prisma configuration
└── tsconfig.json            # TypeScript configuration
```

## Database Schema

```prisma
model Image {
  id        Int      @id @default(autoincrement())
  imageURL  String
  filename  String   @unique
  publicId  String   @unique
  type      String
  createdat DateTime @default(now())
}
```

## Error Handling

The API provides detailed error messages for common scenarios:

- **File Upload Errors**: Invalid field name, file too large, unsupported format
- **Database Errors**: Duplicate entries, connection issues
- **Not Found Errors**: Invalid routes or missing images
- **Validation Errors**: Missing required fields

All errors follow a consistent format:
```json
{
  "status": "fail",
  "message": "Error description"
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma migrate dev` - Create and apply new migrations

### Database Management

To create a new migration:
```bash
npx prisma migrate dev --name migration_name
```

To reset the database:
```bash
npx prisma migrate reset
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:

- Open an issue in the repository
- Check existing issues for similar problems
- Review the [Cloudinary documentation](https://cloudinary.com/documentation)
- Review the [Prisma documentation](https://www.prisma.io/docs)

## License

ISC

## Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, minimalist web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Cloudinary](https://cloudinary.com/) - Cloud-based image management
- [Multer](https://github.com/expressjs/multer) - File upload middleware