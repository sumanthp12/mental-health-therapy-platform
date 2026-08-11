import toast from "react-hot-toast";

const toastOptions = {
  duration: 3000,
  position: "top-right",
};

export const showSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const showError = (message) => {
  toast.error(message, toastOptions);
};

export const showInfo = (message) => {
  toast(message, toastOptions);
};

export const showWarning = (message) => {
  toast(message, {
    ...toastOptions,
    icon: "⚠️",
  });
};

export default toast;