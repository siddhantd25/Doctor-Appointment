import { Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        // console.log(doctorId),
        // localStorage.setItem(doctorId, doctorId),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  // const fetchDoctorInfo = async() => {
  //   try {
  //     const response = await axios.post('/api/doctor-info', { userId: userId });
  //     if (response.data.success) {
  //       localStorage.setItem('doctorId', response.data.doctorId);  // Save doctorId in local storage
  //       console.log('Doctor ID saved to local storage:', response.data.doctorId);
  //     } else {
  //       console.error('Failed to fetch doctor info:', response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching doctor info:', error);
  //   }
  // };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="m-1 btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="m-1 btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h3 className="text-center m-3">All Doctors</h3>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;