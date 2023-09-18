<?php

namespace App\Shared\FileUpload;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileUpload
{
    /**
     * Upload file to storage.
     */
    public static function upload(UploadedFile $file, string $path = '', string $disk = 'uploads'): string
    {
        $fileName = uniqid() . '_' . $file->getClientOriginalName();

        $uploadedPath = Storage::disk($disk)->putFileAs($path, $file, $fileName);

        return $uploadedPath;
    }

    /**
     * Upload multiple files to storage.
    */
    public static function uploadMultiple(array $files, string $path = '', string $disk = 'uploads'): array
    {
        $uploadedPaths = [];

        foreach ($files as $file) {
            $fileName = uniqid() . '_' . $file->getClientOriginalName();

            $uploadedPath = Storage::disk($disk)->putFileAs($path, $file, $fileName);

            $uploadedPaths[] = $uploadedPath;
        }

        return $uploadedPaths;
    }

    /**
     * Delete file from storage.
     */
    public static function delete(string $path, string $disk = 'uploads'): bool
    {
        // check if file exists
        if (!Storage::disk($disk)->exists($path)) {
            return false;
        }

        return Storage::disk($disk)->delete($path);
    }

    /**
     * Delete multiple files from storage.
    */

    public static function deleteMultiple(array $paths, string $disk = 'uploads'): bool
    {
        $deleted = true;

        foreach ($paths as $path) {
            if (!Storage::disk($disk)->exists($path)) {
                $deleted = false;
                continue;
            }

            $deleted = Storage::disk($disk)->delete($path);
        }

        return $deleted;
    }
}
