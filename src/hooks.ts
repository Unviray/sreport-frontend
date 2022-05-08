import { workingMonth } from "./utils/formating"
import { useGet } from "./requests"

export const useMonth = (format: "short" | "long" | boolean = false) => {
  const { data, isLoading, isError } = useGet("/working-month")

  if (format) {
    return {
      month: data && workingMonth(data, format === "short"),
      isLoading,
      isError,
    }
  }

  return {
    month: data,
    isLoading,
    isError,
  }
}
