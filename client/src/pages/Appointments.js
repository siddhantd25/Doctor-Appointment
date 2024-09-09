import { Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);



  const getAppointments = async () => {
    try {
      // const res = await axios.get("/api/doctor/doctor-appointments",
      //  {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body :{
      //     doctorId:"66de96933ef2883d5b5d9830"
      //   }
      // });
      const doctorId = "66de96933ef2883d5b5d9830"; // Example doctor ID
      const res = await axios.get(`/api/doctor/doctor-appointments?doctorId=${doctorId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("the data is",res)
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h3 align="center">Appointments Lists</h3>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
