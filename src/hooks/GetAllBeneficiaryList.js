import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function GetAllBeneficiaryList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [beneficiaries, setBeneficiaries] = useState([]);

  const url = 'http://34.93.59.108/api/challenge/beneficiaries/';

  async function handleGetAllBenificiary() {
    await axios
      .get(url, {
        headers: {
          Authorization: 'Token 98f47184b6ec3a58b40808612d19ed39c0e9cf71',
        },
      })
      .then(res => {
        setBeneficiaries(res.data);
      })
      .catch(err => {
        setError({
          isError: true,
          message: err.message,
        });
      });
  }

  useEffect(() => {
    handleGetAllBenificiary();
  }, []);

  return {loading, beneficiaries, error};
}
