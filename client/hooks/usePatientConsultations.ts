import { useQuery } from "@tanstack/react-query";
import { getConsultations } from "@/services/consultationService";

export default function usePatientConsultations() {
  return useQuery({
    queryKey: ["patient-consultations"],
    queryFn:getConsultations,
  });
}