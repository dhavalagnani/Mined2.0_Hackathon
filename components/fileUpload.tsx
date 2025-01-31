"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { uploadFile } from "@/components/actions/uploadFile"

export default function FileUploadPage() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Controls the upload popup
  const [isAlertOpen, setIsAlertOpen] = useState(false) // Controls success/failure alert
  const [uploadMessage, setUploadMessage] = useState("") // Stores the upload result

  async function handleUpload() {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    const result = await uploadFile(formData)

    setIsUploading(false)

    if (result.success) {
      toast({
        title: "File Uploaded",
        description: result.message,
      })
      setUploadMessage(`✅ ${result.message}`)
      setIsDialogOpen(false) // Close upload popup
    } else {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
      setUploadMessage("❌ Upload failed! Please try again.")
    }

    setIsAlertOpen(true) // Show the alert popup
    setFile(null) // Reset file selection
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  return (
    <>
      {/* Button to open the file uploader modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild> 
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition">
            Upload File Here
          </Button>
        </DialogTrigger>
        
        {/* Popup (Modal) for File Upload */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Your File</DialogTitle>
          </DialogHeader>

          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-6 space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col gap-2 p-6 items-center transition hover:bg-gray-100 cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file")?.click()}
              >
                <FileIcon className="text-gray-500 w-10 h-10" />
                <span className="text-sm font-medium text-gray-600">
                  {file ? file.name : "Drag and drop a file or click to browse"}
                </span>
                <span className="text-xs text-gray-500">PDF only</span>
              </div>
              <div className="space-y-2 text-sm">
                <Label htmlFor="file" className="text-sm font-medium">
                  File
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*,application/pdf,video/*,audio/*"
                  className="file:bg-blue-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 transition"
                onClick={handleUpload}
                disabled={isUploading || !file}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>

      {/* After-Upload Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex flex-col text-white">Upload Status</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogDescription className="flex flex-col text-white">
      {uploadMessage}
    </AlertDialogDescription>
    <AlertDialogFooter>
      <Button onClick={() => setIsAlertOpen(false)}>OK</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}
