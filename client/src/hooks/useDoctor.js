import { useState, useEffect } from "react";
import { getDoctorsByPincode } from "../api/services/doctorService";

export const useDoctorsByPincode = (pincode) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pincode) {
      setError("Add pincode value");
      setLoading(false);
    } else {
      const fetchDoctorsByPincode = async () => {
        try {
          setLoading(true);
          const { status_code, body } = await getDoctorsByPincode(pincode);
          if (status_code != 200) {
            setError(body);
          }
          setData(body);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctorsByPincode();
    }
  }, [pincode]);
  return { data, loading, error };
};
