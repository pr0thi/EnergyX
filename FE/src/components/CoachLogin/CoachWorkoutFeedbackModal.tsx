 import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { Dumbbell, Clock4, CalendarFold, X } from "lucide-react";
import api from "../../api/axios";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
 
interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  profilePic: string;
  rating: number;
  title: string;
}
 
interface WorkoutFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (comment: string) => void;
  clientId: string;
  type: string;
  time: string;
  date: string;
  workoutId: string;
  onStatusUpdate: (
    workoutId: string,
    newStatus: "Finished" | "Waiting for feedback"
  ) => void;
  onToasterMessage: (type: "success" | "error", message: string) => void;
}
 
const CoachWorkoutFeedbackModal: React.FC<WorkoutFeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onStatusUpdate,
  onToasterMessage,
  clientId,
  workoutId,
  type,
  time,
  date,
}) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const coachId = useAppSelector((state: RootState) => state.auth.user?.id);
 
  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) return;
      setLoading(true);
      try {
        const res = await api.get(`/user/api/users/${clientId}`);
        setClient(res.data.user);
      } catch (err) {
        console.error("Failed to fetch client data", err);
      } finally {
        setLoading(false);
      }
    };
 
    if (isOpen) fetchClient();
  }, [clientId, isOpen]);
 
  useEffect(() => {
    if (isOpen) {
      setComment("");
    }
  }, [isOpen]);
 
  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("Submitting feedback:", coachId, clientId, workoutId, comment);
    try {
      const res = await api.post(
        "booking/dev/coaches-page/feedbacks",
        {
          coachId,
          clientId,
          workoutId,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
 
      console.log("Feedback submitted:", res.data.toastMessage);
      // Send the success message to parent component
      onToasterMessage("success", res.data?.toastMessage || "Feedback submitted successfully");
     
      // Update workout status
      onStatusUpdate(workoutId, "Finished");
      setTimeout(() => {
        onClose();
      }, 2000);
      // Optional callback
      if (onSubmit) {
        onSubmit(comment);
      }
 
    } catch (error: any) {
      const errorMessage = error?.response?.data?.toastMessage ||
          error?.toastMessage ||
          "Something went wrong while submitting feedback.";
     
      // Send the error message to parent component
      onToasterMessage("error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  if (!isOpen) return null;
 
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                Workout feedback
              </DialogTitle>
              <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <X />
              </button>
            </div>
 
            <Description className="text-sm text-gray-600 dark:text-gray-300 mb-10">
              Please rate your experience below
            </Description>
 
            {loading ? (
              <div className="flex flex-col md:flex-row justify-between items-start sm:items-center mb-6 gap-10">
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  <Skeleton
                    circle
                    width={64}
                    height={64}
                    baseColor={document.documentElement.classList.contains('dark') ? "#374151" : "#f3f4f6"}
                    highlightColor={document.documentElement.classList.contains('dark') ? "#4B5563" : "#eaeaea"}
                  />
                  <div className="flex flex-col gap-2">
                    <Skeleton
                      width={120}
                      height={16}
                      baseColor={document.documentElement.classList.contains('dark') ? "#374151" : "#f3f4f6"}
                      highlightColor={document.documentElement.classList.contains('dark') ? "#4B5563" : "#eaeaea"}
                    />
                    <Skeleton
                      width={100}
                      height={12}
                      baseColor={document.documentElement.classList.contains('dark') ? "#374151" : "#f3f4f6"}
                      highlightColor={document.documentElement.classList.contains('dark') ? "#4B5563" : "#eaeaea"}
                    />
                    <Skeleton
                      width={60}
                      height={12}
                      baseColor={document.documentElement.classList.contains('dark') ? "#374151" : "#f3f4f6"}
                      highlightColor={document.documentElement.classList.contains('dark') ? "#4B5563" : "#eaeaea"}
                    />
                  </div>
                </div>
                     
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 w-full md:w-1/2">
                  <li className="flex items-center gap-2">
                    <Skeleton
                      width={150}
                      height={12}
                      baseColor={document.documentElement.classList.contains('dark') ? "#374151" : "#f3f4f6"}
                      highlightColor={document.documentElement.classList.contains('dark') ? "#4B5563" : "#eaeaea"}
                    />
                  </li>
                  <li className="flex items-center gap-2">
                    <Skeleton
                      width={100}
                      height={12}
                      baseColor={document.documentElement.classList.contains('dark') ? "#374151" : "#f3f4f6"}
                      highlightColor={document.documentElement.classList.contains('dark') ? "#4B5563" : "#eaeaea"}
                    />
                  </li>
                  <li className="flex items-center gap-2">
                    <Skeleton
                      width={140}
                      height={12}
                      baseColor={document.documentElement.classList.contains('dark') ? "#374151" : "#f3f4f6"}
                      highlightColor={document.documentElement.classList.contains('dark') ? "#4B5563" : "#eaeaea"}
                    />
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start sm:items-center mb-6 gap-10">
                  <div className="flex items-center gap-4 w-full md:w-1/2">
                    <img
                      src={client?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-81ib-b6whieeeQIiIDZiX_ut-HKKQwJYQ&s"}
                      alt={client?.firstName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-md font-semibold text-gray-900 dark:text-white">
                        {client?.firstName} {client?.lastName}
                      </h2>
                      <h3 className="text-md text-gray-700 dark:text-gray-300">({client?.type})</h3>
                    </div>
                  </div>
 
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 w-full md:w-1/2">
                    <li className="flex items-center gap-2">
                      <Dumbbell size={16} className="text-gray-700 dark:text-gray-300" />
                      <span>
                        <strong>Type:</strong> {type}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock4 size={16} className="text-gray-700 dark:text-gray-300" />
                      <span>
                        <strong>Time:</strong> {time}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CalendarFold size={16} className="text-gray-700 dark:text-gray-300" />
                      <span>
                        <strong>Date:</strong> {date}
                      </span>
                    </li>
                  </ul>
                </div>
 
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comments"
                  className="w-full border dark:border-gray-600 rounded-md px-3 py-2 text-sm text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-700 resize-none mb-6 focus:outline-none focus:ring-2 focus:ring-lime-400 dark:focus:ring-lime-500"
                  rows={3}
                />
 
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full p-4 ${
                    isSubmitting
                      ? "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                      : "bg-[#9EF300] hover:bg-lime-400 dark:bg-lime-600 dark:hover:bg-lime-700 text-black dark:text-white"
                  } font-semibold text-sm rounded-md transition cursor-pointer`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
 
export default CoachWorkoutFeedbackModal;