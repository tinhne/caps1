// src/utils/AuthAPI/AdminService.js

import axios from "../../config/axios.customize";

// Ví dụ về hàm lấy danh sách người dùng theo vai trò
export const getAllUserByRole = async (role, page, limit) => {
    return axios.get(`/api/admin/users?role=${role}&page=${page}&limit=${limit}`);
};
export const createDoctor = async (doctorData) => {
  return axios.post('/api/admin/create-doctor', doctorData);
};
export const deletedUser = async (userID) => {
  return axios.delete(`/api/admin/delete-users/${userID}`);
};
export const editUser = async (userID, formData) => {
  return axios.put(`/api/admin/edit-users/${userID}`, formData); // Thêm formData vào request body
};
export const createPatient = (patientData) => {
  return axios.post('/api/admin/create-patient', patientData);

}