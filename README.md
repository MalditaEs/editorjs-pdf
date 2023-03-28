![](https://badgen.net/badge/Editor.js/v2.0/blue)

# PDF File Uploader Plugin for Editor.js

This plugin allows users to upload a PDF file to a server and embed it in a webpage using the `<object>` HTML element. 
The URL endpoint for uploading the PDF file can be configured in the plugin's JavaScript code when declaring the editor.

If the user's browser cannot display PDF files natively, the plugin will offer a download link to the file.

## Usage

To use this plugin, follow these steps:

1. Add the plugin's JavaScript file to your web page:
2. Create a new instance of the plugin and add it to your Editor.js configuration:

```js
const editor = new EditorJS({
    tools: {
        pdf: {
            class: PDFFile,
            config: {
                uploadEndpoint: '/upload-pdf'
            }
        }
    }}); 
   ```


In this example, we've specified `/upload-pdf` as the endpoint for uploading PDF files. You should replace this with the actual URL endpoint for your server.

## Configuration

The plugin can be configured with the following options:

| Option          | Type     | Description                                            |
| --------------- | -------- | ------------------------------------------------------ |
| `uploadEndpoint` | `string` | The URL endpoint for uploading the PDF file to a server |

## License

This plugin is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Credits

This plugin was created by David Fernández at Maldita.es and is based on the Editor.js platform.
