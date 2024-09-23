import { useToast } from "@/hooks/use-toast";

export const useNotification = () => {
    const { toast, dismiss } = useToast();

    const showToastAlert = (message: string) => {
        toast({
            title: `CUIDADO:`,
            description: message,
            variant: "destructive",
        });
    };

    const showToastError = (message: string) => {
        toast({
            title: `ERROR:`,
            description: message,
            variant: "destructive",
        });
    }

    const showToastSuccess = (message: string) => {
        toast({
            title: `EXITO:`,
            description: message,
            variant: "success",
        });
    };

    const showToastInfo = (message: string) => {
        toast({
            title: `INFO:`,
            description: message,
        });
    }

    const showToastWarning = (message: string) => {
        toast({
            title: `ADVERTENCIA:`,
            description: message,
            variant: "warning",
        });
    }

    const closeToast = () => {
        dismiss();
    }

    return {
        closeToast,
        showToastAlert,
        showToastError,
        showToastSuccess,
        showToastInfo,
        showToastWarning,
    };
};
