 import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
 
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}
 
const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="p-6 rounded shadow-md w-[400px] bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-white">
              Log in to book workout
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-xl cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X />
            </button>
          </div>
 
          {/* Description */}
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            You must be logged in to book a workout. Please log in to access available slots and book your session.
          </p>
 
          {/* Buttons */}
          <div className="flex justify-end mt-6 gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onLogin}
              className="px-4 py-2 rounded bg-lime-600 text-white hover:bg-lime-500 dark:bg-lime-500 dark:text-black dark:hover:bg-lime-400 cursor-pointer"
            >
              Log In
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
 
export default LoginModal;