// import React from 'react';
// import { saveAs } from 'file-saver';
// import Packer from 'docx-templates/dist/packer';
// import { Template } from 'docx-templates';

// class WordDocumentTemplate extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       documentData: null,
//     };
//   }

//   componentDidMount() {
//     this.createWordDocument();
//   }

//   createWordDocument = async () => {
//     const template = new Template({
//       content: `
//         <h1 style="text-align: center;">
//           <img src="{{ logo }}" width="100px" />
//         </h1>
//         <h2 style="text-align: center;">
//           Назва «Скло Експерт» - вироби із загартованого скла
//         </h2>
//       `,
//       data: {
//         logo: 'https://example.com/logo.png',
//       },
//     });

//     const buffer = await Packer.toBuffer(template);
//     this.setState({ documentData: buffer });
//   };

//   downloadDocument = () => {
//     const { documentData } = this.state;
//     const blob = new Blob([documentData], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
//     saveAs(blob, 'document.docx');
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.downloadDocument}>Download Document</button>
//       </div>
//     );
//   }
// }

// export default WordDocumentTemplate;