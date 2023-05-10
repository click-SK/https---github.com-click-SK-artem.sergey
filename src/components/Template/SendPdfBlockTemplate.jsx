import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfFileClient from "../PdfFile/PdfFilePartitionClient";
import PdfFile from "../PdfFile/PdfFilePartitionManager";

const SendPdfBlockTemplate = ({finishedPdf, furniture}) => {
    return (
        <div className="mirror_button_exel" style={{ fontSize: 14 }}>
        <PDFDownloadLink
          document={<PdfFile order={finishedPdf} cart={furniture} />}
          fileName="orderDate"
        >
          {({ loading, error }) =>
            loading ? "завантаження..." : "Для менеджера"
          }
        </PDFDownloadLink>
        <PDFDownloadLink
          className=""
          document={<PdfFileClient order={finishedPdf} />}
          fileName="orderDate"
        >
          {({ loading, error }) =>
            loading ? "завантаження..." : "Для клієнта"
          }
        </PDFDownloadLink>
      </div>
    );
};

export default SendPdfBlockTemplate;