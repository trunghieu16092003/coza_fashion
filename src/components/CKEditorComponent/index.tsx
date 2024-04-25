import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface ICKEditorComponentProps {
  value: string;
  onChange: (data: string) => void;
}

function CKEditorComponent({ value, onChange }: ICKEditorComponentProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

export default CKEditorComponent;
