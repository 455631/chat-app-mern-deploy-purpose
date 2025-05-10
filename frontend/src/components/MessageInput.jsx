import { useRef, useState,react } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  // Compress image before setting as preview
  const processImage = (file) => {
    return new Promise((resolve, reject) => {
      setIsProcessing(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image(); // Use window.Image instead of Image
        img.onload = () => {
          // Create canvas for resizing
          const canvas = document.createElement("canvas");
          
          // Calculate new dimensions (max width/height 800px)
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;
          
          if (width > height && width > maxDimension) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
          
          // Set canvas dimensions and draw resized image
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with reduced quality
          const resizedImage = canvas.toDataURL("image/jpeg", 0.7);
          setIsProcessing(false);
          resolve(resizedImage);
        };
        
        img.onerror = () => {
          setIsProcessing(false);
          reject(new Error("Failed to load image"));
        };
        
        img.src = reader.result;
      };
      
      reader.onerror = () => {
        setIsProcessing(false);
        reject(new Error("Failed to read file"));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const processedImage = await processImage(file);
      setImagePreview(processedImage);
    } catch (error) {
      console.error("Failed to process image:", error);
      toast.error("Failed to process image");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Message too large or server error");
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={(!text.trim() && !imagePreview) || isProcessing}
        >
          <Send size={22} />
        </button>
      </form>
      {isProcessing && (
        <div className="text-xs text-zinc-400 mt-1">Processing image...</div>
      )}
    </div>
  );
};

export default MessageInput;
