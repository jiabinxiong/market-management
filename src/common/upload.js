import { uploadService } from '../service';

class UploadComponent {
    upload(file, callback, fileName = 'example.jpeg') {
        const formData = new FormData();
        formData.append('market', file, fileName );

        uploadService.image(formData).then(data => {
            if(data.data.code === 0) {
                callback(data, 0); // 成功
            } else {
                callback(data, 1); // 失败
            }
        })
    }
}

const uploadComponent = new UploadComponent();

export default uploadComponent;
