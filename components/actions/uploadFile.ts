"use server"

export async function uploadFile(formData: FormData) {
  // Simulate file upload delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const file = formData.get("file") as File

  // Here you would typically handle the file upload to your server or cloud storage
  // For this example, we'll just return a success message

  return {
    success: true,
    message: `File "${file.name}" uploaded successfully!`,
  }
}

