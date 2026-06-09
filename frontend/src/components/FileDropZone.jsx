import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

export default function FileDropZone({ onFileAccepted }) {
  const [fileName, setFileName] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        onFileAccepted(file);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors
        ${isDragActive
          ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/20'
          : fileName
          ? 'border-green-400 bg-green-50 dark:bg-green-950/20'
          : 'border-gray-300 bg-gray-50 hover:border-violet-400 hover:bg-violet-50/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-violet-600'}
      `}
    >
      <input {...getInputProps()} />

      {fileName ? (
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">✅</div>
          <p className="font-semibold text-green-700 dark:text-green-400">{fileName}</p>
          <p className="text-sm text-gray-500">Click or drop to replace</p>
        </div>
      ) : isDragActive ? (
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">📄</div>
          <p className="font-semibold text-violet-600">Drop your resume here</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="text-5xl">📎</div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Drag & drop your resume
          </p>
          <p className="text-sm text-gray-500">or click to browse — PDF only</p>
        </div>
      )}
    </motion.div>
  );
}
