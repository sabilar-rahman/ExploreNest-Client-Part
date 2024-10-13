/* eslint-disable no-console */
export const uploadImageToIMGBB = async (imageFile: any) => {
    const imgbbApiKey = "8e452be7c8711f3784a1bbeb553be9d6"; // Replace with your API key
  
    // Create FormData object and append the file
    const formData = new FormData();
  
    formData.append("image", imageFile);
  
    try {
      // Send POST request to IMGBB API
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const result = await response.json();
  
      if (result.success) {
        console.log("Image uploaded successfully:", result.data.url);
  
        return result.data.url; // Return or use the image URL as needed
      } else {
        console.error("Image upload failed:", result.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  // Example usage
  const imageFile = new File(
    [
      /* binary data */
    ],
    "image.png",
    { type: "image/png" }
  );