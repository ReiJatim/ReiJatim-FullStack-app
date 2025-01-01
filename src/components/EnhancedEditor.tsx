"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 2MB

const EnhancedEditor: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [channel, setChannel] = useState("");
  const [tag, setTag] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CharacterCount,
      Image.configure({
        inline: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
    ],
    content: "<p>Start writing here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[calc(100vh-200px)]",
      },
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.log("Error: File size exceeds 2MB limit.");
        return;
      }

      try {
        // Compress the image
        const options = {
          maxSizeMB: 0.7, // Maximum size in MB
          maxWidthOrHeight: 1024, // Resize image to this max width/height
          useWebWorker: true, // Use a web worker for performance
        };

        const compressedFile = await imageCompression(file, options);
        console.log(
          `Original size: ${(file.size / 1024).toFixed(
            2
          )} KB, Compressed size: ${(compressedFile.size / 1024).toFixed(2)} KB`
        );

        // Read the compressed file
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          editor?.chain().focus().setImage({ src: imageUrl }).run();
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else console.warn(error)
      }
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      console.log("Error: Title is required.");
      return;
    }

    const payload = {
      title,
      description,
      channel,
      tag,
      content: editor?.getJSON(),
    };

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.message)
        return;
      }

      const result = await response.json();
      console.log("News submitted successfully:", result);
      setTitle("");
      setDescription("");
      setChannel("");
      setTag("");
      editor?.commands.clearContent();
      router.push('/admin/news')
    } catch (error) {
      if (error instanceof Error) setError(error.message)
      else console.warn(error)
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`flex-grow transition-all duration-300 ease-in-out ${
          sidebarOpen ? "mr-80" : "mr-0"
        }`}
      >
              {error && (
          <div className="p-2 text-red-500">
            {error}
          </div>
        )}
        <div className="h-full flex flex-col">
          <div className="p-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="text-2xl font-bold"
              required
            />
          </div>

          <div className="flex-grow overflow-auto">
            <div className="sticky top-0 z-10 bg-background bo">
              <div className="flex flex-wrap items-center gap-2 p-2">
                <Select
                  onValueChange={(value) => {
                    if (value.startsWith("heading")) {
                      const level = parseInt(
                        value.replace("heading", ""),
                        10
                      ) as 1 | 2 | 3;
                      editor.chain().focus().toggleHeading({ level }).run();
                    } else {
                      editor.chain().focus().setParagraph().run();
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Paragraph" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="heading1">Heading 1</SelectItem>
                    <SelectItem value="heading2">Heading 2</SelectItem>
                    <SelectItem value="heading3">Heading 3</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  data-state={editor.isActive("bold") ? "active" : "inactive"}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  data-state={editor.isActive("italic") ? "active" : "inactive"}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  data-state={
                    editor.isActive("underline") ? "active" : "inactive"
                  }
                >
                  <UnderlineIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  data-state={
                    editor.isActive({ textAlign: "left" })
                      ? "active"
                      : "inactive"
                  }
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  data-state={
                    editor.isActive({ textAlign: "center" })
                      ? "active"
                      : "inactive"
                  }
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  data-state={
                    editor.isActive({ textAlign: "right" })
                      ? "active"
                      : "inactive"
                  }
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                  }
                  data-state={
                    editor.isActive({ textAlign: "justify" })
                      ? "active"
                      : "inactive"
                  }
                >
                  <AlignJustify className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  data-state={
                    editor.isActive("bulletList") ? "active" : "inactive"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  data-state={
                    editor.isActive("orderedList") ? "active" : "inactive"
                  }
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  data-state={
                    editor.isActive("blockquote") ? "active" : "inactive"
                  }
                >
                  <Quote className="h-4 w-4" />
                </Button>
                <label htmlFor="image-upload">
                  <Button variant="ghost" size="sm" asChild>
                    <div>
                      <ImageIcon className="h-4 w-4" />
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </Button>
                </label>
              </div>
            </div>
            <EditorContent
              editor={editor}
              className="min-h-[calc(100vh-200px)]"
            />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground p-2 shadow-2xl">
            <span>{editor?.storage.characterCount.words() ?? 0} words</span>
            <span>
              {editor?.storage.characterCount.characters() ?? 0} characters
            </span>
          </div>
        </div>
      </div>

      <div
        className={`right-0 top-64 h-full w-80 bg-muted transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-10 top-1/2 transform -translate-y-1/2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        <div className="p-4 space-y-4 h-full overflow-auto">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="h-24"
            />
          </div>
          <div>
            <Label htmlFor="tag">Tag</Label>
            <Input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter tag"
              className="w-full"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
          <div className="absolute bottom-4 right-4">
            <Button onClick={() => router.push("/admin")} variant="ghost">
              Back to Admin Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEditor;
