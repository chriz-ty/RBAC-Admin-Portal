import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface WarningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function WarningDialog({ isOpen, onClose, message }: WarningDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center text-amber-600">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold flex-1">Warning</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 text-sm">{message}</p>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg"
            >
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}