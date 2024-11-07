import React, { useEffect, useState } from "react";
import "../../style/adminStyle/service.scss";
import {
  getAllServices,
  addNewService,
  deleteService,
  updateService,
} from "../../services/serviceAPI";
import ModalCreateService from "../../components/admin/ServiceManage/ModalCreateService";
import ModalEditService from "../../components/admin/ServiceManage/ModalEditService";
import ModalDeleteService from "../../components/admin/ServiceManage/ModalDeleteService";

function Services() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);

  // Fetch services
  const fetchServices = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllServices(page, 5);
      if (data) {
        setServices(data.services);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError("Không thể tải danh sách dịch vụ.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Lỗi khi kết nối tới server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  // Modal handlers
  const handleCreateModalShow = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleEditModalShow = (service) => {
    setEditingService(service);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);

  const handleDeleteModalShow = (service) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);

  // Pagination handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="service-page">
      <div className="add-service-button">
        <button className="btn btn-primary" onClick={handleCreateModalShow}>
          Thêm dịch vụ mới
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="service-table">
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.price.toLocaleString()} VND</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditModalShow(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteModalShow(service)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Không có dịch vụ nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal Thêm dịch vụ */}
      <ModalCreateService
        show={showCreateModal}
        handleClose={handleCreateModalClose}
        fetchServices={fetchServices}
        addNewService={addNewService}
      />

      {/* Modal Chỉnh sửa dịch vụ */}
      {editingService && (
        <ModalEditService
          show={showEditModal}
          handleClose={handleEditModalClose}
          fetchServices={fetchServices}
          editingService={editingService}
          updateService={updateService}
        />
      )}

      {/* Modal Xóa dịch vụ */}
      {deletingService && (
        <ModalDeleteService
          show={showDeleteModal}
          handleClose={handleDeleteModalClose}
          fetchServices={fetchServices}
          deletingService={deletingService}
          deleteService={deleteService}
        />
      )}
    </div>
  );
}

export default Services;
