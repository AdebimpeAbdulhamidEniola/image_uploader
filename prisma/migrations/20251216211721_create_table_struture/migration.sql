-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
