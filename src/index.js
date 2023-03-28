class PDFFile {
    static get toolbox() {
        return {
            title: 'PDF',
            icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.75 18.75V3.25H8.983V9h-4.5V21.75h14.25v-3zm-2.25 2.25H10.483V10.5h9V21zm-5.25-5.25V13.5h2.25v2.25h2.25v2.25h-4.5zM5.983 8.5h2.25V6.25h-2.25v2.25zm4.5 10.5v-3h4.5v3h-4.5z" fill="currentColor"/></svg>'
        };
    }

    constructor({ data = {}, config, wrapper }) {
        this.data = data;
        this.config = config;
        this.wrapper = wrapper;
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.addEventListener('dragover', this.handleDragOver.bind(this));
        this.wrapper.addEventListener('drop', this.handleInputChange.bind(this));
        this.wrapper.addEventListener('paste', this.handlePaste.bind(this));

        if (this.data && this.data.url) {
            const objectElement = this.createPDFObjectElement(this.data.url);
            this.wrapper.innerHTML = '';
            this.wrapper.appendChild(objectElement);
        } else {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'application/pdf');
            input.addEventListener('input', this.handleInputChange.bind(this));
            this.wrapper.appendChild(input);
        }

        return this.wrapper;
    }

    handlePaste(event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        const fileItem = Array.from(items).find(item => item.kind === 'file' && item.type === 'application/pdf');
        if (!fileItem) {
            return;
        }
        const file = fileItem.getAsFile();
        this.uploadFile(file);
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleInputChange(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        this.uploadFile(file);
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(this.config.uploadEndpoint, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                this.data = {
                    url: data.file.url
                };
                const objectElement = this.createPDFObjectElement(data.file.url);
                this.wrapper.innerHTML = '';
                this.wrapper.appendChild(objectElement);
            } else {
                throw new Error('La carga del archivo ha fallado.');
            }
        } catch (error) {
            console.error(error);
            alert('No se pudo cargar el archivo PDF.');
            this.wrapper.innerHTML = '';
        }
    }

    createPDFObjectElement(url) {
        const objectElement = document.createElement('object');
        objectElement.setAttribute('data', url + '#toolbar=0');
        objectElement.setAttribute('type', 'application/pdf');
        objectElement.setAttribute('width', '100%');
        objectElement.setAttribute('height', '600px');
        const pElement = document.createElement('p');
        pElement.innerText = 'Este navegador no soporta mostrar archivos PDF. : ';
        const aElement = document.createElement('a');
        aElement.setAttribute('href', url + '#pagemode=none&toolbar=0&statusbar=0&messages=0&navpanes=0');
        aElement.innerText = 'Descárgalo para poder verlo.';
        pElement.appendChild(aElement);
        objectElement.appendChild(pElement);
        return objectElement;
    }


    save() {
        return this.data;
    }

    static get isReadOnlySupported() {
        return true;
    }
}

module.exports = PDFFile;
