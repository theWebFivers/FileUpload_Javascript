// STEP 1: Select elements and register change event
const imagePreview = document.querySelector('[data-target="image-preview"]');
const fileUploader = document.querySelector('[data-target="file-uploader"]');

fileUploader.addEventListener("change", handleFileUpload);

// Handle file upload
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Check file type and size before proceeding
  const beforeUploadCheck = beforeUpload(file);
  if (!beforeUploadCheck.isValid) {
    alert(beforeUploadCheck.errorMessages);
    return;
  }

  // Display the image using URL.createObjectURL
  const imageURL = URL.createObjectURL(file);
  showPreviewImage(imageURL);

  // Reset input field to allow re-upload
  e.target.value = '';
}

// Show the image preview using URL.createObjectURL
function showPreviewImage(imageURL) {
  imagePreview.src = imageURL;
}

// Validate file type and size
function beforeUpload(fileObject) {
  const validFileTypes = ["image/jpeg", "image/png"];
  const isValidFileType = validFileTypes.includes(fileObject.type);
  let errorMessages = [];

  if (!isValidFileType) {
    errorMessages.push("You can only upload JPG or PNG file!");
  }

  const isValidFileSize = fileObject.size / 1024 / 1024 < 2; // 2MB
  if (!isValidFileSize) {
    errorMessages.push("Image must be smaller than 2MB!");
  }

  return {
    isValid: isValidFileType && isValidFileSize,
    errorMessages: errorMessages.join("\n")
  };
}
