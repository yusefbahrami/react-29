import swal from "sweetalert";

export const Confirm = async (
  title,
  message,
  icon,
  buttons = ["خیر", "بله"]
) => {
  const result = await swal({
    title: title,
    text: message,
    icon: icon,
    buttons: buttons,
  });
    return result;
};

export const Alert = (title, message, icon) => {
  swal({ title: title, text: message, icon: icon });
};
