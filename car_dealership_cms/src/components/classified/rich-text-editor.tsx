"use client";

// import { env } from "@/env";
import type { IAllProps } from "@tinymce/tinymce-react";
import {
  Editor,
  type InitOptions,
} from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "../ui/form";

interface TextEditorProps {
  name: string;
  label?: string;
  config?: IAllProps;
}

export const RichTextEditor = (props: TextEditorProps) => {
  const { name, label, config } = props;

  const init: InitOptions = {
    height: 200,
    skin: "oxide-dark",
    content_css: "dark",
    icons: "small",
    resize: false,
    menubar: false,
    branding: false,
    convert_urls: true,
    wordcount: true,
    elementpath: true,
    importcss_append: true,
    browser_spellcheck: true,
    highlight_on_focus: true,
    newline_behavior: "linebreak", // Changed from 'linebreak'
    forced_root_block: "p", // Added to ensure consistent block behavior
    plugins: ["lists", "link", "wordcount", "importcss", "media"],
    valid_elements: "p,a[href|rel|target],strong/b,em/i,u,strike,br,ul,ol,li",
    toolbar:
      "undo redo | styles | formatselect bold italic | bullist numlist | link",

    // Configure link settings
    link_default_target: "_blank",
    link_assume_external_targets: true,
    autolink_pattern: /^(https?:\/\/|www\.)(.+)$/i,

    // Configure paste behavior
    paste_postprocess: (plugin:any, args:any) => {
      const links = args.node.getElementsByTagName("a");
      for (let i = 0; i < links.length; i++) {
        links[i].style.color = "#3b82f6";
        links[i].style.textDecoration = "underline";
      }
    },
    // Add custom styles for links
    content_style: `
        a {
            color: #3b82f6;
            text-decoration: underline;
            cursor: pointer;
        }
        a:hover {
            color: #2563eb;
        }
    `,
    ...(config?.init && { ...config.init }),
  };

  const form = useFormContext();
  const value = form.watch(name);

  const handleEditorChange = (content: string) => {
    form.setValue(name, content);
  };

  return (
    <div className="space-y-2">
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <Editor
        {...props.config}
        init={init}
        value={value}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};
