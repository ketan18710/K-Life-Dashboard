import React ,{useState,useEffect,useRef} from 'react';
import { Editor } from '@tinymce/tinymce-react';  
import { EMAIL_EDITOR_API_KEY } from 'utils/constants';
import './style.scss'
function TextEditor (props) {
  const {content,setHtml,saveContentTrigger} = props
  const tinymce = useRef(null)
  useEffect(() => {
    if(saveContentTrigger){
      // const x =  tinymce.getContent()
      const content = tinymce.current.editor.getContent()
      setHtml(content)
    }
  }, [saveContentTrigger])
    return (
      <div className="textEditor">
        <Editor
          initialValue={content} 
          apiKey={EMAIL_EDITOR_API_KEY}
          ref = {tinymce }
          init={{
            height: 500,
            menubar: false,
            selector : 'h1',
            forced_root_block : "", 
            force_br_newlines : true,
            force_p_newlines : false,
            // onchange_callback : onChangeFunc,
            plugins: [
              'advlist autolink lists link image',
              'print preview anchor help',
              'textcolor',
              'searchreplace  code',
              'insertdatetime media table paste noneditable'
            ],
            noneditable_editable_class: 'mceEditable',
            noneditable_noneditable_class: 'mceNonEditable',
            fontsize_formats:"1pt 2pt 3pt 4pt 5pt 6pt 7pt 8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
            toolbar1:' formatselect fontsizeselect| bold italic | alignleft aligncenter alignright | undo redo | bullist numlist outdent indent   ',
            toolbar2 : 'forecolor backcolor | image | link | code | insertdatetime |  preview | searchreplace | blockquote ',
            
          }}
          // onChange={(e)=>{setHtml(e.target.getContent());}}
        />
      </div>
    );
}

export default TextEditor; 