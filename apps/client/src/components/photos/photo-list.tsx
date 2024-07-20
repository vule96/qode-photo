import { Col, Row } from 'antd';
import { getPhotos } from '../../services/photo';
import PhotoItem from './photo-item';

async function getPhotoData() {
  const response = await getPhotos();
  return response.metadata;
}

export default async function PhotoList() {
  const photos = await getPhotoData();

  return (
    <div
      style={{
        margin: '20px 0',
        maxWidth: 1280,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <Row gutter={[16, 16]} justify={photos.length ? 'start' : 'center'}>
        {photos.length ? (
          photos.map((photo) => (
            <Col xs={24} lg={6} key={photo.id}>
              <PhotoItem photo={photo} />
            </Col>
          ))
        ) : (
          <p
            style={{
              fontSize: 24,
              margin: '24px 0',
            }}
          >
            No photo
          </p>
        )}
      </Row>
    </div>
  );
}
