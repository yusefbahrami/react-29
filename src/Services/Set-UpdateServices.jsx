import { Alert } from "../Alerts/MessageComponents";
import { Post, Put } from "./CRUDServices";

export const setUserService = async (route, data) => {
  try {
    const result = await Post(route, data);
    if (result.status === 201 || result.status === 200) {
      Alert("عملیات موفق", "اطلاعات با موفقیت ثبت شد", "success");
    } else {
      Alert("خطا", "خطا در ثبت اطلاعات!", "error");
    }
  } catch (error) {
    Alert(`Error ${error.request.status}`, "خطا در برقراری ارتباط!", "error");
  }
};

export const updateUserService = async (route, data, userId) => {
  try {
    const result = await Put(route, userId, data);
    if (result.status === 201 || result.status === 200) {
      Alert("عملیاات موفق", "اطلاعات با موفقیت ویرایش شد", "success");
    } else {
      Alert("خطا", "خطا در ویرایش اطلاعات!", { icon: "error" });
    }
  } catch (error) {
    Alert(`Error ${error.request.status}`, "خطا در برقراری ارتباط", "error");
  }
};
