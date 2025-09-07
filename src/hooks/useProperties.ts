import { useQuery } from "@tanstack/react-query";
import { propertyApi, ReviewFilters, type Property } from "@/lib/api";

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      try {
        const response = await propertyApi.getAll();
        return response.data.properties;
      } catch (error) {
        console.warn("Backend not available, using mock data");
        console.log(error);
      }
    },
  });
};

export const usePropertiesAdmin = () => {
  return useQuery({
    queryKey: ["propertiesAdmin"],
    queryFn: async () => {
      try {
        const response = await propertyApi.getAllAdmin();
        return response.data.properties;
      } catch (error) {
        console.warn("Backend not available, using mock data");
        console.log(error);
      }
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      try {
        const response = await propertyApi.getById(id);
        return response.data;
      } catch (error) {
        // Fallback to mock data if backend is not available
        console.warn("Backend not available, using mock data");
        console.log(error);
      }
    },
    enabled: !!id,
  });
};

export const usePropertyAdmin = (id: string, query: ReviewFilters) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      try {
        const response = await propertyApi.getById(id);
        return response.data;
      } catch (error) {
        // Fallback to mock data if backend is not available
        console.warn("Backend not available, using mock data");
        console.log(error);
      }
    },
    enabled: !!id,
  });
};
