const Service = require("../models/Services");

// tao dich vu phong kham
exports.createService = async (serviceData) => {
  try {
    const service = new Service(serviceData);
    await service.save();
    return { success: true, service };
  } catch (error) {
    console.error("Lỗi khi tạo dịch vụ: ", error);
    return { success: false, message: "Lỗi khi tạo dịch vụ" };
  }
};

// lay tat ca dich vu phong kham
exports.getAllServices = async () => {
  try {
    const services = await Service.find();
    return { success: true, services };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ: ", error);
    return { success: false, message: "Lỗi khi lấy danh sách dịch vụ" };
  }
};

// cap nhat dich vu phong kham theo id
exports.updateService = async (serviceId, serviceData) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      { _id: serviceId },
      { ...serviceData },
      { new: true }
    );
    if (!updatedService) {
      return { success: false, message: "Không tìm thấy dịch vụ" };
    }
    return { success: true, service: updatedService };
  } catch (error) {
    console.error("Lỗi khi cập nhật dịch vụ: ", error);
    return { success: false, message: "Lỗi khi cập nhật dịch vụ" };
  }
};

// xoa dich vu phong kham theo id
exports.deleteService = async (serviceId) => {
  try {
    const deletedService = await Service.findByIdAndDelete({ _id: serviceId });
    if (!deletedService) {
      return { success: false, message: "Không tìm thấy dịch vụ" };
    }
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa dịch vụ: ", error);
    return { success: false, message: "Lỗi khi xóa dịch vụ" };
  }
};