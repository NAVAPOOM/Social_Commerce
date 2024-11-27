'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Progress,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

interface ImportInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportInventoryModal({
  isOpen,
  onClose,
}: ImportInventoryModalProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [importing, setImporting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setProgress(0);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
          setProgress(i);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        console.log('Imported data:', jsonData);
        onClose();
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setImporting(false);
      setProgress(0);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        name: 'Example Item',
        sku: 'SKU-001',
        category: 'Electronics',
        price: 99.99,
        stockLevel: 100,
        reorderPoint: 20,
        location: 'Warehouse A',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'inventory_import_template.xlsx');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Import Inventory
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="solar:file-download-linear" width={20} />}
                  onPress={downloadTemplate}
                >
                  Download Template
                </Button>

                <div
                  {...getRootProps()}
                  className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <input {...getInputProps()} />
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        className="text-success"
                        icon="solar:file-check-bold"
                        width={24}
                      />
                      <p className="text-center text-small">
                        {file.name}
                      </p>
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        className="text-default-400"
                        icon="solar:upload-linear"
                        width={24}
                      />
                      <p className="text-center text-small text-default-500">
                        {isDragActive
                          ? 'Drop the file here'
                          : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-tiny text-default-400">
                        Supported formats: XLSX, CSV
                      </p>
                    </div>
                  )}
                </div>

                {importing && (
                  <Progress
                    aria-label="Import progress"
                    classNames={{
                      base: "max-w-full",
                      track: "drop-shadow-md border border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                      label: "tracking-wider font-medium text-default-600",
                      value: "text-foreground/60",
                    }}
                    label="Importing..."
                    value={progress}
                    showValueLabel
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={!file || importing}
                onPress={handleImport}
              >
                Import
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}