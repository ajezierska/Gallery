import React, { useEffect, useState } from "react";
import { getPhoto, getSlugPhoto } from "../utils/utils";

export const PhotosList = () => {
  const [photosList, setPhotosList] = useState([]);
  const [indexPhoto, setIndexPhoto] = useState(0);
  const [photosOnPage, setPhotosOnPage] = useState([]);
  const amountPhotos = 3;

  const fetchPhotos = async () => {
    try {
      const response = await fetch("https://picsum.photos/v2/list");
      const data = await response.json();
      setPhotosList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (!photosList) return;
    let photos = getPhoto(amountPhotos, indexPhoto, photosList);
    if (photos.length < amountPhotos) {
      const difference = amountPhotos - photos.length;
      const addedPhotos = photosList.slice(0, difference);
      photos = photos.concat(addedPhotos);
    }
    setPhotosOnPage(photos);
  }, [amountPhotos, indexPhoto, photosList]);

  const handleClick = () => {
    if (indexPhoto > photosList.length - 1 - amountPhotos) {
      const currentAmountPhoto = photosList.length - indexPhoto;
      const differencePhotos = amountPhotos - currentAmountPhoto;
      setIndexPhoto(differencePhotos);
    } else {
      setIndexPhoto(indexPhoto + amountPhotos);
    }
  };

  return (
    <div className="container">
      <div className="photos">
        {photosOnPage.length ? (
          photosOnPage.map((photo) => (
            <figure className="photos__item" key={photo.id}>
              <img
                className="photos__img"
                src={`http://source.unsplash.com/${getSlugPhoto(photo.url)}`}
                alt={`photo by ${photo.author}`}
                aria-hidden="true"
              />
            </figure>
          ))
        ) : (
          <div className="loader"></div>
        )}
        <button onClick={handleClick} className="photos__button">
          next
        </button>
      </div>
    </div>
  );
};
