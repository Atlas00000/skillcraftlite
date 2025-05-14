'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import ResetPasswordForm from './reset-password-form';

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="text-center text-gray-400">
      Loading...
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] p-4"
    >
      <Suspense fallback={<LoadingFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </motion.div>
  );
}