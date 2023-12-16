document.addEventListener('DOMContentLoaded', () => {
    const file1Input = document.getElementById('file1');
    const file2Input = document.getElementById('file2');
    const outputInput = document.getElementById('output');
    const processButton = document.getElementById('processButton');
    const removeDuplicatesButton = document.getElementById('removeDuplicatesButton');
    const fileForDuplicatesInput = document.getElementById('fileForDuplicates'); // New input field
    const statusDiv = document.getElementById('status');

    processButton.addEventListener('click', () => {
        const file1 = file1Input.files[0];
        const file2 = file2Input.files[0];
        const output = outputInput.files[0];

        if (!file1 || !file2 || !output) {
            statusDiv.textContent = 'Please select all files and an output file.';
            return;
        }

        const reader1 = new FileReader();
        reader1.onload = () => {
            const content1 = reader1.result;

            const reader2 = new FileReader();
            reader2.onload = () => {
                const content2 = reader2.result;

                const linesToRemove = content2.split('\n').map(line => line.trim());
                const pattern = new RegExp(linesToRemove.map(line => `^${line}$`).join('|'), 'gm');

                const updatedContent = content1.replace(pattern, '');

                const blob = new Blob([updatedContent], { type: 'text/plain' });
                const blobUrl = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = 'output.txt';
                a.textContent = 'Download Output File';
                a.style.display = 'none';
                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);

                statusDiv.textContent = 'Defect content removed and output file downloaded.';
            };
            reader2.readAsText(file2);
        };
        reader1.readAsText(file1);
    });

    removeDuplicatesButton.addEventListener('click', () => {
        const fileForDuplicates = fileForDuplicatesInput.files[0];

        if (!fileForDuplicates) {
            statusDiv.textContent = 'Please select the file to remove duplicates from.';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;

            const contentLines = content.split('\n').map(line => line.trim());
            const uniqueLines = new Set(contentLines);
            const uniqueContent = Array.from(uniqueLines).join('\n');

            const blob = new Blob([uniqueContent], { type: 'text/plain' });
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'output_no_duplicates.txt';
            a.textContent = 'Download Output (No Duplicates)';
            a.style.display = 'block';
            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);

            statusDiv.textContent = 'Duplicates removed from the file.';
        };

        reader.readAsText(fileForDuplicates);
    });
});
