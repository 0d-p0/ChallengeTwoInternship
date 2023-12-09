import React, {useState, useEffect} from 'react';
import axios from 'axios';
function GetBeneficiaryDetails(id) {
  const url = `http://34.93.59.108/api/challenge/beneficiaries/${id}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [beneficiaryDetails, setBeneficiaryDetails] = useState();

  async function handleGetBenificiaryDetails() {
    setLoading(true);
    await axios
      .get(url, {
        headers: {
          Authorization: 'Token 98f47184b6ec3a58b40808612d19ed39c0e9cf71',
        },
      })
      .then(res => {
        setBeneficiaryDetails(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);

        setError({
          isError: true,
          message: err.message,
        });
      });
  }
  useEffect(() => {
    handleGetBenificiaryDetails();
  }, []);
  return {loading, error, beneficiaryDetails};
}

export default GetBeneficiaryDetails;
